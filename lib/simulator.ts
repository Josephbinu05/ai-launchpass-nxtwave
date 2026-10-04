import type { Recommendation, SimulationResult, SimulatorSettings } from "../types";

export const CAMPAIGN_GOAL = 500;
export const CAMPAIGN_BUDGET = 2000;

export const defaultSimulator: SimulatorSettings = {
  captains: 20,
  registrationsPerCaptain: 12,
  clubRegistrations: 120,
  shareRate: 40,
  invitesPerSharer: 2.5,
  referralConversion: 40,
  organicRegistrations: 0,
  rewards: [1000, 600, 400],
};

const bounded = (value: unknown, fallback: number, max: number, integer = false) => {
  const numeric = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  const result = Math.min(max, Math.max(0, numeric));
  return integer ? Math.round(result) : result;
};

export function normalizeSimulator(value: Partial<SimulatorSettings> | null | undefined): SimulatorSettings {
  const input = value ?? {};
  return {
    captains: bounded(input.captains, defaultSimulator.captains, 1000, true),
    registrationsPerCaptain: bounded(input.registrationsPerCaptain, defaultSimulator.registrationsPerCaptain, 1000, true),
    clubRegistrations: bounded(input.clubRegistrations, defaultSimulator.clubRegistrations, 100000, true),
    shareRate: bounded(input.shareRate, defaultSimulator.shareRate, 100),
    invitesPerSharer: bounded(input.invitesPerSharer, defaultSimulator.invitesPerSharer, 100),
    referralConversion: bounded(input.referralConversion, defaultSimulator.referralConversion, 100),
    organicRegistrations: bounded(input.organicRegistrations, defaultSimulator.organicRegistrations, 100000, true),
    rewards: Array.from({ length: 3 }, (_, index) => bounded(input.rewards?.[index], defaultSimulator.rewards[index], 100000, true)),
  };
}

/** One referral generation from captain + club registrations, rounded once. */
export function simulate(settings: SimulatorSettings): SimulationResult {
  const input = normalizeSimulator(settings);
  const captainRegistrations = input.captains * input.registrationsPerCaptain;
  const baseRegistrations = captainRegistrations + input.clubRegistrations;
  const referralMultiplier = (input.shareRate / 100) * input.invitesPerSharer * (input.referralConversion / 100);
  const referralRegistrations = Math.round(baseRegistrations * referralMultiplier);
  const total = baseRegistrations + referralRegistrations + input.organicRegistrations;
  const spent = input.rewards.reduce((sum, reward) => sum + reward, 0);
  return {
    captainRegistrations, baseRegistrations, referralRegistrations, referralMultiplier, total, spent,
    gap: Math.max(0, CAMPAIGN_GOAL - total),
    surplus: Math.max(0, total - CAMPAIGN_GOAL),
    goalProgress: (total / CAMPAIGN_GOAL) * 100,
    remainingBudget: CAMPAIGN_BUDGET - spent,
    budgetExceeded: spent > CAMPAIGN_BUDGET,
    cpa: total > 0 ? spent / total : 0,
    targetAchieved: total >= CAMPAIGN_GOAL,
  };
}

export function getRecommendations(settings: SimulatorSettings): Recommendation[] {
  const input = normalizeSimulator(settings);
  const result = simulate(input);
  const recommendations: Recommendation[] = [];

  if (result.budgetExceeded) {
    recommendations.push({
      title: "Bring incentives back within ₹2,000",
      detail: `The proposed rewards exceed the budget by ₹${result.spent - CAMPAIGN_BUDGET}. Restore ₹1,000 / ₹600 / ₹400 before considering this plan feasible.`,
      patch: { rewards: [...defaultSimulator.rewards] },
    });
  }

  if (result.gap === 0) {
    recommendations.push({
      title: "Validate the sharing assumption first",
      detail: `This model clears the goal by ${result.surplus} registrations. Ask the first five captains to test the hook and record actual shares and conversions before scaling.`,
    });
    recommendations.push({
      title: "Stress-test referral conversion",
      detail: "Apply a 30% conversion scenario to see how much extra campus distribution you would need if fewer invites convert.",
      patch: { referralConversion: 30 },
    });
    return recommendations;
  }

  if (input.registrationsPerCaptain > 0) {
    let captains = Math.max(input.captains + 1, Math.ceil(((CAMPAIGN_GOAL - input.organicRegistrations) / (1 + result.referralMultiplier) - input.clubRegistrations) / input.registrationsPerCaptain));
    while (captains < 1000 && simulate({ ...input, captains }).total < CAMPAIGN_GOAL) captains += 1;
    if (captains <= 1000 && simulate({ ...input, captains }).total >= CAMPAIGN_GOAL) {
      recommendations.push({
        title: `Recruit ${captains - input.captains} more campus captain${captains - input.captains === 1 ? "" : "s"}`,
        detail: `${input.captains} → ${captains} captains at ${input.registrationsPerCaptain} direct registrations each models ${simulate({ ...input, captains }).total} registrations, including the same referral assumptions.`,
        patch: { captains },
      });
    }
  }

  let clubRegistrations = Math.max(input.clubRegistrations + 1, Math.ceil((CAMPAIGN_GOAL - input.organicRegistrations) / (1 + result.referralMultiplier) - result.captainRegistrations));
  while (clubRegistrations < 100000 && simulate({ ...input, clubRegistrations }).total < CAMPAIGN_GOAL) clubRegistrations += 1;
  recommendations.push({
    title: `Add ${clubRegistrations - input.clubRegistrations} direct club registrations`,
    detail: `Raise the club contribution from ${input.clubRegistrations} to ${clubRegistrations}. With the current sharing assumptions, this models ${simulate({ ...input, clubRegistrations }).total} total registrations.`,
    patch: { clubRegistrations },
  });

  const inviteConversion = input.invitesPerSharer * (input.referralConversion / 100);
  if (result.baseRegistrations > 0 && inviteConversion > 0) {
    const shareRate = Math.ceil(((CAMPAIGN_GOAL - result.baseRegistrations - input.organicRegistrations) / (result.baseRegistrations * inviteConversion)) * 100);
    if (shareRate > input.shareRate && shareRate <= 100 && simulate({ ...input, shareRate }).total >= CAMPAIGN_GOAL) {
      recommendations.push({
        title: `Raise the share rate to ${shareRate}%`,
        detail: `Move from ${input.shareRate}% to ${shareRate}% by making the invite step clearer and testing a useful resource milestone. This models ${simulate({ ...input, shareRate }).total} registrations if invite quality holds.`,
        patch: { shareRate },
      });
    }
  }
  return recommendations;
}
