import assert from "node:assert/strict";
import test from "node:test";
import { branches, experienceLevels, interests, projects } from "../data/projects";
import { seedChannels, seedColleges, seedLeaders, seedMetrics, seedTrend } from "../data/seed";
import { createInitialState, deriveChannels, deriveColleges, deriveLeaders, deriveMetrics, recommendProjects, registerStudent, resolveAttribution, restoreState } from "../lib/engine";
import { defaultSimulator, getRecommendations, normalizeSimulator, simulate } from "../lib/simulator";
import type { RegistrationInput } from "../types";

const now = "2026-10-04T12:00:00.000Z";
const registration: RegistrationInput = {
  name: "Maya Raman", email: "maya@example.com", phone: "+91 98765 43210", college: "Amrita",
  branch: branches[0], graduationYear: 2027, selectedProjectId: projects[0].id,
  experience: experienceLevels[0], interest: "Career / Resume",
};

test("aggregate demo metrics reconcile without synthetic full student records", () => {
  const state = createInitialState();
  assert.equal(state.students.length, 0);
  assert.equal(seedColleges.reduce((sum, item) => sum + item.registrations, 0), 386);
  assert.equal(seedChannels.reduce((sum, item) => sum + item.registrations, 0), 386);
  assert.equal(seedChannels.reduce((sum, item) => sum + item.visitors, 0), 1850);
  assert.equal(seedLeaders.reduce((sum, item) => sum + item.referrals, 0), 142);
  assert.equal(seedTrend.at(-1)?.registrations, seedMetrics.registrations);
  assert.equal(deriveMetrics(state).projectedTotal, 504);
  assert.ok(seedColleges.length >= 8 && seedLeaders.length >= 10 && projects.length >= 12);
});

test("all branch, experience and interest combinations get a relevant deterministic match", () => {
  for (const branch of branches) for (const experience of experienceLevels) for (const interest of interests) {
    const answers = { branch, experience, interest };
    const first = recommendProjects(answers)[0];
    assert.ok(first.project.interests.includes(interest), `${branch} / ${experience} / ${interest}`);
    assert.equal(recommendProjects(answers)[0].project.id, first.project.id);
    assert.ok(first.reasons.length > 0);
    if (experience === experienceLevels[0]) assert.ok(first.project.experienceLevels.includes(experience));
  }
});

test("registration is immutable, normalizes contact data, and updates all aggregate totals", () => {
  const initial = createInitialState();
  const { state, student } = registerStudent(initial, registration, now);
  assert.equal(initial.students.length, 0);
  assert.equal(student.phone, "9876543210");
  assert.equal(student.college, "Amrita University");
  assert.equal(student.createdAt, now);
  assert.equal(state.currentStudentId, student.id);
  assert.equal(deriveMetrics(state).registrations, 387);
  assert.equal(deriveChannels(state).reduce((sum, item) => sum + item.registrations, 0), 387);
  assert.equal(deriveColleges(state).reduce((sum, item) => sum + item.registrations, 0), 387);
  assert.equal(deriveColleges(state).find((item) => item.name === "Amrita University")?.registrations, 65);
});

test("validation rejects duplicate emails and malformed fields", () => {
  const state = registerStudent(createInitialState(), registration, now).state;
  assert.throws(() => registerStudent(state, { ...registration, email: " MAYA@EXAMPLE.COM " }, now), /already has/);
  assert.throws(() => registerStudent(createInitialState(), { ...registration, email: "bad" }, now), /email/);
  assert.throws(() => registerStudent(createInitialState(), { ...registration, phone: "123" }, now), /mobile/);
  assert.throws(() => registerStudent(createInitialState(), { ...registration, college: "" }, now), /college/);
  assert.throws(() => registerStudent(createInitialState(), { ...registration, graduationYear: "bad" }, now), /graduation/);
  assert.throws(() => registerStudent(createInitialState(), { ...registration, selectedProjectId: "missing" }, now), /AI project/);
});

test("captured local referral survives navigation and credits exactly one new registration", () => {
  const first = registerStudent(createInitialState(), registration, now);
  const attribution = resolveAttribution(`?ref=${first.student.referralCode.toLowerCase()}&utm_source=referral`, first.state.attribution);
  assert.equal(resolveAttribution("?project=resume-screener", attribution).ref, first.student.referralCode);
  const second = registerStudent({ ...first.state, attribution }, { ...registration, name: "Aditi Rao", email: "aditi@example.com", phone: "9876543211", college: "New Campus" }, now);
  assert.equal(second.student.referredBy, first.student.referralCode);
  assert.equal(second.student.acquisitionSource, "referrals");
  assert.equal(second.state.referrals.length, 1);
  assert.equal(second.state.attribution.ref, null);
  assert.equal(deriveMetrics(second.state).referralRegistrations, 143);
  assert.equal(deriveLeaders(second.state).find((leader) => leader.id === first.student.id)?.referrals, 1);
  assert.equal(deriveColleges(second.state).find((college) => college.name === "New Campus")?.registrations, 1);
  assert.equal(deriveChannels(second.state).reduce((sum, channel) => sum + channel.registrations, 0), 388);
});

test("seed leader codes work, unknown codes are visible errors, and clearing attribution is explicit", () => {
  const initial = createInitialState();
  initial.attribution = resolveAttribution("?ref=riya24&utm_source=whatsapp&utm_medium=club");
  const first = registerStudent(initial, registration, now);
  assert.equal(deriveLeaders(first.state).find((leader) => leader.referralCode === "RIYA24")?.referrals, 23);
  assert.equal(first.student.acquisitionSource, "referrals");
  assert.throws(() => registerStudent(initial, { ...registration, referralCode: "UNKNOWN" }, now), /referral code/);
  const cleared = registerStudent(initial, { ...registration, referralCode: "" }, now);
  assert.equal(cleared.state.referrals.length, 0);
  assert.equal(cleared.student.referredBy, null);
});

test("captain and club campaign links map to meaningful source buckets", () => {
  assert.equal(resolveAttribution("?utm_source=whatsapp&utm_medium=club&utm_campaign=ai60").source, "clubs");
  assert.equal(resolveAttribution("?utm_source=campus_captain").source, "captains");
  assert.equal(resolveAttribution("?utm_source=instagram").source, "organic");
});

test("custom campus names reconcile case-insensitively and cannot resolve inherited object keys", () => {
  const first = registerStudent(createInitialState(), { ...registration, college: "New Engineering College" }, now);
  const second = registerStudent(first.state, { ...registration, email: "second@example.com", college: "new engineering college" }, now);
  assert.equal(second.student.college, "New Engineering College");
  assert.equal(deriveColleges(second.state).filter((college) => college.name.toLowerCase() === "new engineering college").length, 1);
  assert.equal(deriveColleges(second.state).find((college) => college.name === second.student.college)?.registrations, 2);
  assert.equal(registerStudent(createInitialState(), { ...registration, college: "constructor" }, now).student.college, "constructor");
});

test("persistence round trips state and gracefully recovers malformed or orphaned data", () => {
  const initial = createInitialState();
  initial.attribution = resolveAttribution("?ref=RIYA24");
  const state = registerStudent(initial, registration, now).state;
  assert.deepEqual(restoreState(JSON.stringify(state)), state);
  for (const invalid of [null, "broken json", [], { version: 99 }, { version: 1, students: [{}], referrals: [] }]) {
    assert.deepEqual(restoreState(invalid), createInitialState());
  }
  assert.equal(restoreState({ ...state, referrals: [] }).students.length, 0);
  assert.equal(restoreState({ ...state, simulator: { shareRate: 900, referralConversion: -20 } }).simulator.shareRate, 100);
  assert.equal(restoreState({ ...state, currentStudentId: "missing" }).currentStudentId, null);
});

test("simulator default is 504 from one referral generation and ₹2,000 proposed rewards", () => {
  const result = simulate(defaultSimulator);
  assert.equal(result.captainRegistrations, 240);
  assert.equal(result.baseRegistrations, 360);
  assert.equal(result.referralRegistrations, 144);
  assert.equal(result.total, 504);
  assert.equal(result.gap, 0);
  assert.equal(result.spent, 2000);
  assert.equal(result.remainingBudget, 0);
  assert.equal(result.targetAchieved, true);
});

test("zero distribution, fractional referrals and over-budget assumptions remain transparent", () => {
  const zero = simulate({ ...defaultSimulator, captains: 0, clubRegistrations: 0, organicRegistrations: 0 });
  assert.equal(zero.total, 0);
  assert.equal(zero.gap, 500);
  assert.equal(zero.cpa, 0);
  const small = simulate({ ...defaultSimulator, captains: 1, registrationsPerCaptain: 3, clubRegistrations: 0, shareRate: 50, invitesPerSharer: 1, referralConversion: 50, rewards: [2000, 600, 400] });
  assert.equal(small.referralRegistrations, 1);
  assert.equal(small.total, 4);
  assert.equal(small.budgetExceeded, true);
  assert.equal(small.remainingBudget, -1000);
  assert.equal(normalizeSimulator({ shareRate: NaN }).shareRate, 40);
});

test("every acquisition recommendation patch actually closes the modeled gap", () => {
  const scenarios = [
    { ...defaultSimulator, referralConversion: 30 },
    { ...defaultSimulator, captains: 12, shareRate: 15 },
    { ...defaultSimulator, captains: 0, registrationsPerCaptain: 0, clubRegistrations: 0, referralConversion: 0 },
  ];
  for (const settings of scenarios) {
    const suggestions = getRecommendations(settings);
    assert.ok(suggestions.length > 0);
    for (const suggestion of suggestions) {
      assert.ok(suggestion.patch);
      assert.ok(simulate({ ...settings, ...suggestion.patch }).total >= 500, suggestion.title);
    }
  }
});

test("only distinct local sharers count and fresh/reset state does not share mutable arrays", () => {
  const first = registerStudent(createInitialState(), registration, now);
  const state = { ...first.state, sharedStudentIds: [first.student.id, first.student.id, "missing"] };
  assert.equal(deriveMetrics(state).shares, 155);
  const reset = createInitialState();
  reset.simulator.rewards[0] = 0;
  assert.equal(createInitialState().simulator.rewards[0], 1000);
  assert.equal(deriveMetrics(createInitialState()).registrations, 386);
});
