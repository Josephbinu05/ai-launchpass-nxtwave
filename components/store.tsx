"use client";
/* eslint react-hooks/set-state-in-effect: "off" -- Hydrate browser-only localStorage after the static server render, then synchronize route attribution. */

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { createInitialState, registerStudent, resolveAttribution, restoreState } from '@/lib/engine';
import { projects } from '@/data/projects';
import { seedLeaders } from '@/data/seed';
import type { CampaignState, MatcherAnswers, SimulatorSettings } from '@/types';

export const STORAGE_KEY = 'ai-launchpass:v1';
type RegistrationInput = Parameters<typeof registerStudent>[1];
type FunnelStage = keyof CampaignState['funnel'];

function useCampaignState() {
  const [state, setState] = useState<CampaignState>(createInitialState);
  const stateRef = useRef(state);
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState('');
  const session = useRef('');
  const pathname = usePathname();

  const commit = useCallback((next: CampaignState) => {
    stateRef.current = next;
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
    catch { setStorageWarning('Browser storage is unavailable or full. Your demo works for this visit, but changes may not survive a reload.'); }
  }, []);

  useEffect(() => {
    let loaded = createInitialState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) loaded = restoreState(JSON.parse(raw));
      session.current = sessionStorage.getItem('launchpass-session') || crypto.randomUUID();
      sessionStorage.setItem('launchpass-session', session.current);
    } catch {
      session.current = crypto.randomUUID();
      setStorageWarning('Saved demo data could not be loaded. A fresh simulation is ready.');
    }
    loaded.attribution = resolveAttribution(window.location.search, loaded.attribution);
    commit(loaded);
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try { const next = restoreState(JSON.parse(event.newValue)); stateRef.current = next; setState(next); }
        catch { setStorageWarning('Another tab changed the demo data. Reload to start a fresh simulation.'); }
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [commit]);

  const track = useCallback((stage: FunnelStage) => {
    const next = structuredClone(stateRef.current);
    const stages: FunnelStage[] = ['visitors', 'matcherStarted', 'matcherCompleted', 'registrationStarted'];
    let changed = false;
    for (const key of stages.slice(0, stages.indexOf(stage) + 1)) {
      const id = `${session.current}:${key}`;
      if (!next.trackedEvents.includes(id)) { next.trackedEvents.push(id); next.funnel[key]++; changed = true; }
    }
    if (changed) commit(next);
  }, [commit]);

  useEffect(() => {
    if (!ready) return;
    const attribution = resolveAttribution(window.location.search, stateRef.current.attribution);
    if (JSON.stringify(attribution) !== JSON.stringify(stateRef.current.attribution)) commit({ ...stateRef.current, attribution });
    if (pathname === '/') track('visitors');
    if (pathname.startsWith('/match')) track('matcherStarted');
    if (pathname.startsWith('/project/')) track('matcherCompleted');
    if (pathname.startsWith('/register')) track('registrationStarted');
  }, [pathname, ready, track, commit]);

  const register = (input: RegistrationInput) => {
    // Validate before recording a successful new student journey.
    const previousStudents = stateRef.current.students.length;
    const result = registerStudent(stateRef.current, input);
    commit(result.state);
    // A fresh demo registration represents a new student journey in this browser.
    if (previousStudents) {
      session.current = crypto.randomUUID();
      try { sessionStorage.setItem('launchpass-session', session.current); } catch { /* in-memory demo remains available */ }
      track('registrationStarted');
    }
    return result.student;
  };

  return {
    state, ready, storageWarning,
    currentStudent: state.students.find(student => student.id === state.currentStudentId) || null,
    setMatcher: (matcher: MatcherAnswers) => commit({ ...stateRef.current, matcher }),
    register,
    updateSimulator: (simulator: SimulatorSettings) => commit({ ...stateRef.current, simulator }),
    updateCampusTarget: (campusTarget: number) => commit({ ...stateRef.current, campusTarget: Math.max(1, Math.min(500, Math.round(campusTarget || 50))) }),
    switchStudent: (id: string) => commit({ ...stateRef.current, currentStudentId: id }),
    trackShare: () => {
      const s = stateRef.current;
      if (s.currentStudentId && !s.sharedStudentIds.includes(s.currentStudentId)) commit({ ...s, sharedStudentIds: [...s.sharedStudentIds, s.currentStudentId] });
    },
    resetDemo: () => {
      session.current = crypto.randomUUID();
      try { sessionStorage.setItem('launchpass-session', session.current); } catch { /* optional storage */ }
      commit(createInitialState());
    },
    generateDemo: () => {
      const next = stateRef.current.students.length + 1;
      const original = stateRef.current.currentStudentId;
      const student = register({ name: `Demo Student ${next}`, email: `student-${crypto.randomUUID().slice(0,8)}@example.com`, phone: String(9000000000 + next), college: 'Amrita', branch: 'CSE / IT', graduationYear: new Date().getFullYear() + 1, selectedProjectId: projects[0].id, referralCode: stateRef.current.students[0]?.referralCode || seedLeaders[0].referralCode });
      if (original) commit({ ...stateRef.current, currentStudentId: original });
      return student;
    },
  };
}
type CampaignContextValue = ReturnType<typeof useCampaignState>;
const CampaignContext = createContext<CampaignContextValue | null>(null);
export function CampaignProvider({ children }: { children: ReactNode }) {
  const value = useCampaignState();
  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}
export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) throw new Error('CampaignProvider is required');
  return context;
}
