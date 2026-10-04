import { branches, experienceLevels, interests, projects } from "../data/projects";
import { seedChannels, seedColleges, seedLeaders, seedMetrics } from "../data/seed";
import type { AcquisitionSource, Attribution, CampaignMetrics, CampaignState, ChannelMetric, College, MatcherAnswers, Project, Referral, ReferralLeader, RegistrationInput, Student } from "../types";
import { defaultSimulator, normalizeSimulator, simulate } from "./simulator";

const sources: AcquisitionSource[] = ["captains", "referrals", "clubs", "organic"];
const emptyAttribution = (): Attribution => ({ ref: null, source: "organic", utmSource: "", utmMedium: "", utmCampaign: "" });
const clean = (value: unknown): string => typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
const codeOf = (value: unknown) => clean(value).toUpperCase();
const record = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const count = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;

export function createInitialState(): CampaignState {
  return {
    version: 1,
    students: [],
    referrals: [],
    currentStudentId: null,
    matcher: { branch: "", experience: "", interest: "" },
    attribution: emptyAttribution(),
    simulator: { ...defaultSimulator, rewards: [...defaultSimulator.rewards] },
    funnel: { visitors: 0, matcherStarted: 0, matcherCompleted: 0, registrationStarted: 0 },
    trackedEvents: [],
    sharedStudentIds: [],
    campusTarget: 50,
  };
}

export function recommendProjects(answers: MatcherAnswers): { project: Project; score: number; reasons: string[] }[] {
  return projects.map((project) => {
    const branchMatch = project.branches.includes(answers.branch);
    const interestMatch = project.interests.includes(answers.interest);
    const experienceMatch = project.experienceLevels.includes(answers.experience);
    const score = (interestMatch ? 8 : 0) + (branchMatch ? 3 : 0) + (experienceMatch ? 4 : 0);
    const reasons: string[] = [];
    if (interestMatch) reasons.push(`Connects directly to your interest in ${answers.interest.toLowerCase()}.`);
    if (branchMatch) reasons.push(`A useful starting point for ${answers.branch} students.`);
    if (experienceMatch) reasons.push(answers.experience === experienceLevels[0] ? "An approachable first build with a guided starter template." : "Fits your current coding experience with a guided build.");
    if (!reasons.length) reasons.push("Explore this alternative with the workshop's prepared starter materials.");
    return { project, score, reasons };
  }).sort((a, b) => b.score - a.score || a.project.buildTime - b.project.buildTime || a.project.id.localeCompare(b.project.id));
}

function mapSource(source: string, medium: string): AcquisitionSource {
  const combined = `${source} ${medium}`.toLowerCase();
  if (/captain|ambassador/.test(combined)) return "captains";
  if (/club|group|department|ieee/.test(combined)) return "clubs";
  if (/referral|referrer|student/.test(combined)) return "referrals";
  return "organic";
}

/** Retain a captured referral until successful registration, including route changes. */
export function resolveAttribution(search: string, previous?: Attribution): Attribution {
  const prior = previous ?? emptyAttribution();
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  if (!["ref", "utm_source", "utm_medium", "utm_campaign"].some((key) => params.has(key))) return { ...prior };
  const ref = params.has("ref") ? codeOf(params.get("ref")).slice(0, 50) || null : prior.ref;
  const utmSource = params.has("utm_source") ? clean(params.get("utm_source")).slice(0, 100) : prior.utmSource;
  const utmMedium = params.has("utm_medium") ? clean(params.get("utm_medium")).slice(0, 100) : prior.utmMedium;
  const utmCampaign = params.has("utm_campaign") ? clean(params.get("utm_campaign")).slice(0, 100) : prior.utmCampaign;
  const hasSource = params.has("utm_source") || params.has("utm_medium");
  return { ref, utmSource, utmMedium, utmCampaign, source: ref ? "referrals" : hasSource ? mapSource(utmSource, utmMedium) : params.has("ref") ? "organic" : prior.source };
}

function canonicalCollege(input: string): string {
  const normalized = clean(input);
  const aliases: Record<string, string> = { "amrita": "Amrita University", "vit university": "VIT", "srm university": "SRM", "psg": "PSG Tech", "manipal": "MIT Manipal" };
  const key = normalized.toLowerCase();
  const alias = Object.hasOwn(aliases, key) ? aliases[key] : undefined;
  return seedColleges.find((college) => college.name.toLowerCase() === key)?.name ?? alias ?? normalized;
}

function findReferrer(state: CampaignState, code: string): Pick<Student, "id" | "referralCode"> | undefined {
  return state.students.find((student) => student.referralCode === code) ?? seedLeaders.find((leader) => leader.referralCode === code);
}

/** No storage/network side effects. Pass now in tests or scripted demos for deterministic timestamps. */
export function registerStudent(state: CampaignState, input: RegistrationInput, now = new Date().toISOString()): { state: CampaignState; student: Student } {
  const name = clean(input.name);
  const email = clean(input.email).toLowerCase();
  const compactPhone = clean(input.phone).replace(/[\s()\-]/g, "");
  const phone = compactPhone.startsWith("+91") ? compactPhone.slice(3) : compactPhone.length === 12 && compactPhone.startsWith("91") ? compactPhone.slice(2) : compactPhone;
  const canonicalName = canonicalCollege(input.college);
  const college = state.students.find((student) => student.college.toLowerCase() === canonicalName.toLowerCase())?.college ?? canonicalName;
  const graduationYear = Number(input.graduationYear);
  const branch = clean(input.branch);
  const experience = input.experience || state.matcher.experience || experienceLevels[0];
  const interest = input.interest || state.matcher.interest || interests[0];
  if (name.length < 2 || name.length > 80) throw new Error("Enter your name using 2–80 characters.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) throw new Error("Enter a valid email address.");
  if (state.students.some((student) => student.email === email)) throw new Error("This email already has a LaunchPass in this browser. Use My LaunchPass or a different demo email.");
  if (!/^[6-9]\d{9}$/.test(phone)) throw new Error("Enter a valid 10-digit Indian mobile number, optionally with +91.");
  if (college.length < 2 || college.length > 120) throw new Error("Enter your college name using 2–120 characters.");
  if (!branches.includes(branch)) throw new Error("Choose your engineering branch.");
  if (!Number.isInteger(graduationYear) || graduationYear < 2024 || graduationYear > 2035) throw new Error("Choose a graduation year between 2024 and 2035.");
  if (!experienceLevels.includes(experience) || !interests.includes(interest)) throw new Error("Complete the project matcher with valid experience and interest choices.");
  if (!projects.some((project) => project.id === input.selectedProjectId)) throw new Error("Choose an AI project before reserving your seat.");
  if (!Number.isFinite(Date.parse(now))) throw new Error("The registration time could not be saved. Please try again.");

  // An explicitly cleared form field overrides an incoming URL code.
  const referringCode = codeOf(input.referralCode !== undefined ? input.referralCode : state.attribution.ref);
  const referrer = referringCode ? findReferrer(state, referringCode) : undefined;
  if (referringCode && !referrer) throw new Error("That referral code is not available in this browser's demo. Check the code or clear it to continue.");

  const prefix = name.split(" ")[0].replace(/[^a-z]/gi, "").slice(0, 6).toUpperCase() || "STUDENT";
  let sequence = seedMetrics.registrations + state.students.length + 1;
  let id = `LP${String(sequence).padStart(4, "0")}`;
  let referralCode = `${prefix}${sequence.toString(36).toUpperCase()}`;
  while (state.students.some((student) => student.id === id) || findReferrer(state, referralCode)) {
    sequence += 1;
    id = `LP${String(sequence).padStart(4, "0")}`;
    referralCode = `${prefix}${sequence.toString(36).toUpperCase()}`;
  }
  const source = referrer ? "referrals" : state.attribution.source === "referrals" ? "organic" : state.attribution.source;
  const student: Student = { id, name, email, phone, college, branch, graduationYear, experience, interest, selectedProjectId: input.selectedProjectId, referralCode, referredBy: referringCode || null, acquisitionSource: source, createdAt: now };
  const referral: Referral | null = referrer ? { id: `REF-${id}`, referrerId: referrer.id, referredStudentId: id, code: referringCode, createdAt: now } : null;
  return {
    student,
    state: {
      ...state,
      students: [...state.students, student],
      referrals: referral ? [...state.referrals, referral] : [...state.referrals],
      currentStudentId: id,
      attribution: emptyAttribution(),
    },
  };
}

export function deriveMetrics(state: CampaignState): CampaignMetrics {
  const localRegistrations = state.students.length;
  const registrations = seedMetrics.registrations + localRegistrations;
  const referralRegistrations = seedMetrics.referralRegistrations + state.referrals.length;
  return {
    ...seedMetrics,
    // A direct demo registration implies a visitor and completed acquisition flow.
    visitors: seedMetrics.visitors + Math.max(state.funnel.visitors, localRegistrations),
    matcherStarted: seedMetrics.matcherStarted + Math.max(state.funnel.matcherStarted, localRegistrations),
    matcherCompleted: seedMetrics.matcherCompleted + Math.max(state.funnel.matcherCompleted, localRegistrations),
    registrationStarted: seedMetrics.registrationStarted + Math.max(state.funnel.registrationStarted, localRegistrations),
    registrations,
    referralRegistrations,
    shares: seedMetrics.shares + new Set(state.sharedStudentIds.filter((id) => state.students.some((student) => student.id === id))).size,
    projectedTotal: simulate(state.simulator).total,
    goalProgress: (registrations / seedMetrics.goal) * 100,
    referralShare: (referralRegistrations / registrations) * 100,
    cpa: seedMetrics.costSpent / registrations,
  };
}

export function deriveColleges(state: CampaignState): College[] {
  const colleges = new Map(seedColleges.map((college) => [college.name.toLowerCase(), { ...college }]));
  for (const student of state.students) {
    const name = canonicalCollege(student.college);
    const key = name.toLowerCase();
    const current = colleges.get(key);
    if (current) current.registrations += 1;
    else colleges.set(key, { id: `campus-${encodeURIComponent(key)}`, name, registrations: 1 });
  }
  return [...colleges.values()].sort((a, b) => b.registrations - a.registrations || a.name.localeCompare(b.name)).map((college, index) => ({ ...college, target: state.campusTarget, rank: index + 1 }));
}

export function deriveChannels(state: CampaignState): ChannelMetric[] {
  const unconvertedVisitors = Math.max(0, state.funnel.visitors - state.students.length);
  return seedChannels.map((channel) => {
    const local = state.students.filter((student) => student.acquisitionSource === channel.id).length;
    const registrations = channel.registrations + local;
    const visitors = channel.visitors + local + (channel.id === state.attribution.source ? unconvertedVisitors : 0);
    return { ...channel, registrations, visitors, conversionRate: visitors > 0 ? (registrations / visitors) * 100 : 0 };
  });
}

export function deriveLeaders(state: CampaignState): ReferralLeader[] {
  const leaders = [
    ...seedLeaders.map((leader) => ({ ...leader })),
    ...state.students.map((student) => ({ id: student.id, name: student.name, college: student.college, referralCode: student.referralCode, referrals: 0 })),
  ];
  return leaders.map((leader) => ({ ...leader, referrals: leader.referrals + state.referrals.filter((referral) => referral.referrerId === leader.id).length }))
    .sort((a, b) => b.referrals - a.referrals || a.name.localeCompare(b.name)).map((leader, index) => ({ ...leader, rank: index + 1 }));
}

function isStudent(value: unknown): value is Student {
  if (!record(value)) return false;
  const textKeys = ["id", "name", "email", "phone", "college", "branch", "experience", "interest", "selectedProjectId", "referralCode", "createdAt"];
  if (!textKeys.every((key) => typeof value[key] === "string" && (value[key] as string).length > 0 && (value[key] as string).length <= 180)) return false;
  return /^[6-9]\d{9}$/.test(value.phone as string)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email as string)
    && /^[A-Z0-9]{3,20}$/.test(value.referralCode as string)
    && sources.includes(value.acquisitionSource as AcquisitionSource)
    && branches.includes(value.branch as string)
    && experienceLevels.includes(value.experience as string)
    && interests.includes(value.interest as string)
    && projects.some((project) => project.id === value.selectedProjectId)
    && typeof value.graduationYear === "number" && Number.isInteger(value.graduationYear) && value.graduationYear >= 2024 && value.graduationYear <= 2035
    && (value.referredBy === null || typeof value.referredBy === "string")
    && Number.isFinite(Date.parse(value.createdAt as string));
}

/** Validate untrusted persisted JSON and recover safely to a complete fresh state. */
export function restoreState(value: unknown): CampaignState {
  const initial = createInitialState();
  if (typeof value === "string") {
    try { return restoreState(JSON.parse(value)); } catch { return initial; }
  }
  if (!record(value) || value.version !== 1 || !Array.isArray(value.students) || !Array.isArray(value.referrals) || !value.students.every(isStudent)) return initial;
  const students = value.students;
  if (["id", "email", "referralCode"].some((key) => new Set(students.map((student) => student[key as keyof Student])).size !== students.length)) return initial;
  if (students.some((student) => seedLeaders.some((leader) => leader.id === student.id || leader.referralCode === student.referralCode))) return initial;
  const provisional = { ...initial, students };
  const validReferrals = value.referrals.every((referral) => record(referral)
    && typeof referral.id === "string" && typeof referral.code === "string" && typeof referral.createdAt === "string" && Number.isFinite(Date.parse(referral.createdAt))
    && findReferrer(provisional, referral.code)?.id === referral.referrerId
    && students.some((student) => student.id === referral.referredStudentId && student.referredBy === referral.code && student.acquisitionSource === "referrals")
    && referral.referrerId !== referral.referredStudentId);
  if (!validReferrals) return initial;
  const referrals = value.referrals as unknown as Referral[];
  if (new Set(referrals.map((referral) => referral.referredStudentId)).size !== referrals.length) return initial;
  if (students.some((student) => Boolean(student.referredBy) !== referrals.some((referral) => referral.referredStudentId === student.id) || (student.acquisitionSource === "referrals") !== Boolean(student.referredBy))) return initial;

  const matcher = record(value.matcher) ? value.matcher : {};
  const attribution = record(value.attribution) ? value.attribution : {};
  const funnel = record(value.funnel) ? value.funnel : {};
  return {
    ...initial,
    students: students.map((student) => ({ ...student })),
    referrals: referrals.map((referral) => ({ ...referral })),
    currentStudentId: students.some((student) => student.id === value.currentStudentId) ? value.currentStudentId as string : null,
    matcher: {
      branch: branches.includes(matcher.branch as string) ? matcher.branch as string : "",
      experience: experienceLevels.includes(matcher.experience as string) ? matcher.experience as string : "",
      interest: interests.includes(matcher.interest as string) ? matcher.interest as string : "",
    },
    attribution: {
      ref: typeof attribution.ref === "string" && /^[A-Z0-9]{3,20}$/.test(attribution.ref) ? attribution.ref : null,
      source: sources.includes(attribution.source as AcquisitionSource) ? attribution.source as AcquisitionSource : "organic",
      utmSource: clean(attribution.utmSource).slice(0, 100),
      utmMedium: clean(attribution.utmMedium).slice(0, 100),
      utmCampaign: clean(attribution.utmCampaign).slice(0, 100),
    },
    simulator: normalizeSimulator(record(value.simulator) ? value.simulator : undefined),
    funnel: { visitors: count(funnel.visitors), matcherStarted: count(funnel.matcherStarted), matcherCompleted: count(funnel.matcherCompleted), registrationStarted: count(funnel.registrationStarted) },
    trackedEvents: Array.isArray(value.trackedEvents) ? [...new Set(value.trackedEvents.filter((item): item is string => typeof item === "string" && item.length < 200))] : [],
    sharedStudentIds: Array.isArray(value.sharedStudentIds) ? [...new Set(value.sharedStudentIds.filter((id): id is string => typeof id === "string" && students.some((student) => student.id === id)))] : [],
    campusTarget: typeof value.campusTarget === "number" && Number.isFinite(value.campusTarget) ? Math.max(1, Math.min(10000, Math.round(value.campusTarget))) : 50,
  };
}
