import type { AcquisitionSource, ReferralLeader } from "../types";

/** All figures in this file are synthetic campaign examples, never live results. */
export const seedMetrics = {
  visitors: 1850,
  matcherStarted: 1220,
  matcherCompleted: 940,
  registrationStarted: 610,
  registrations: 386,
  shares: 154,
  referralRegistrations: 142,
  costSpent: 1420,
  goal: 500,
  budget: 2000,
};

export const seedColleges = [
  { id: "vit", name: "VIT", registrations: 72 },
  { id: "amrita", name: "Amrita University", registrations: 64 },
  { id: "srm", name: "SRM", registrations: 58 },
  { id: "psg", name: "PSG Tech", registrations: 49 },
  { id: "manipal", name: "MIT Manipal", registrations: 45 },
  { id: "anna", name: "Anna University", registrations: 38 },
  { id: "sastra", name: "SASTRA", registrations: 34 },
  { id: "nit-trichy", name: "NIT Trichy", registrations: 26 },
];

export const seedChannels: { id: AcquisitionSource; name: string; registrations: number; visitors: number }[] = [
  { id: "captains", name: "Campus Captains", registrations: 168, visitors: 520 },
  { id: "referrals", name: "Student Referrals", registrations: 142, visitors: 560 },
  { id: "clubs", name: "College Clubs", registrations: 54, visitors: 420 },
  { id: "organic", name: "Organic", registrations: 22, visitors: 350 },
];

export const seedLeaders: Omit<ReferralLeader, "rank">[] = [
  { id: "seed-riya", name: "Riya S.", college: "VIT", referralCode: "RIYA24", referrals: 22 },
  { id: "seed-arjun", name: "Arjun K.", college: "Amrita University", referralCode: "ARJUN19", referrals: 19 },
  { id: "seed-meera", name: "Meera P.", college: "SRM", referralCode: "MEERA17", referrals: 17 },
  { id: "seed-kavin", name: "Kavin R.", college: "PSG Tech", referralCode: "KAVIN15", referrals: 15 },
  { id: "seed-ananya", name: "Ananya M.", college: "MIT Manipal", referralCode: "ANANYA14", referrals: 14 },
  { id: "seed-dev", name: "Dev A.", college: "Anna University", referralCode: "DEV13", referrals: 13 },
  { id: "seed-sneha", name: "Sneha V.", college: "SASTRA", referralCode: "SNEHA12", referrals: 12 },
  { id: "seed-rohan", name: "Rohan N.", college: "NIT Trichy", referralCode: "ROHAN11", referrals: 11 },
  { id: "seed-aisha", name: "Aisha F.", college: "VIT", referralCode: "AISHA10", referrals: 10 },
  { id: "seed-vishal", name: "Vishal B.", college: "Amrita University", referralCode: "VISHAL9", referrals: 9 },
];

/** Cumulative registrations at the end of each simulated campaign day. */
export const seedTrend = [
  { day: "Day 1", registrations: 38 },
  { day: "Day 2", registrations: 101 },
  { day: "Day 3", registrations: 187 },
  { day: "Day 4", registrations: 281 },
  { day: "Day 5", registrations: 386 },
];
