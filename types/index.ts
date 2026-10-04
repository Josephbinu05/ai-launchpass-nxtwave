export type AcquisitionSource = "captains" | "referrals" | "clubs" | "organic";

export interface MatcherAnswers {
  branch: string;
  experience: string;
  interest: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  branches: string[];
  interests: string[];
  experienceLevels: string[];
  difficulty: string;
  buildTime: number;
  stack: string[];
  learningOutcomes: string[];
  workshopRelevance: string;
}

export type AIProject = Project;

export interface Attribution {
  ref: string | null;
  source: AcquisitionSource;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  graduationYear: number;
  experience: string;
  interest: string;
  selectedProjectId: string;
  referralCode: string;
  referredBy: string | null;
  acquisitionSource: AcquisitionSource;
  createdAt: string;
}

export interface RegistrationInput {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  graduationYear: number | string;
  selectedProjectId: string;
  experience?: string;
  interest?: string;
  referralCode?: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredStudentId: string;
  code: string;
  createdAt: string;
}

export interface College {
  id: string;
  name: string;
  registrations: number;
  target: number;
  rank: number;
}

export interface ChannelMetric {
  id: AcquisitionSource;
  name: string;
  registrations: number;
  visitors: number;
  conversionRate: number;
}

export interface ReferralLeader {
  id: string;
  name: string;
  college: string;
  referralCode: string;
  referrals: number;
  rank: number;
}

export interface SimulatorSettings {
  captains: number;
  registrationsPerCaptain: number;
  clubRegistrations: number;
  /** Percentage points, from 0 to 100. */
  shareRate: number;
  invitesPerSharer: number;
  /** Percentage points, from 0 to 100. */
  referralConversion: number;
  organicRegistrations: number;
  rewards: number[];
}

export interface SimulationResult {
  captainRegistrations: number;
  baseRegistrations: number;
  referralRegistrations: number;
  referralMultiplier: number;
  total: number;
  gap: number;
  surplus: number;
  goalProgress: number;
  spent: number;
  remainingBudget: number;
  budgetExceeded: boolean;
  cpa: number;
  targetAchieved: boolean;
}

export interface Recommendation {
  title: string;
  detail: string;
  patch?: Partial<SimulatorSettings>;
}

export interface CampaignMetrics {
  visitors: number;
  matcherStarted: number;
  matcherCompleted: number;
  registrationStarted: number;
  registrations: number;
  shares: number;
  referralRegistrations: number;
  costSpent: number;
  projectedTotal: number;
  goalProgress: number;
  referralShare: number;
  cpa: number;
  budget: number;
  goal: number;
}

export interface CampaignState {
  version: 1;
  students: Student[];
  referrals: Referral[];
  currentStudentId: string | null;
  matcher: MatcherAnswers;
  attribution: Attribution;
  simulator: SimulatorSettings;
  /** Local events only; seeded funnel counts are added when reading metrics. */
  funnel: {
    visitors: number;
    matcherStarted: number;
    matcherCompleted: number;
    registrationStarted: number;
  };
  trackedEvents: string[];
  sharedStudentIds: string[];
  campusTarget: number;
}
