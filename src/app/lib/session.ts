'use client';

import { User, Session } from '@/app/types';

const SESSION_KEY = 'session';
const SESSION_DURATION = 60 * 1000 * 60; // 1 hour

export function createSession(user: User): void {
  const expiresAt = Date.now() + SESSION_DURATION;
  const session: Session = { user, expiresAt };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;
  try {
    const session: Session = JSON.parse(sessionStr);
    return session;
  } catch (error) {
    console.error('Error parsing session', error);
    return null;
  }
}

export function isSessionActive(): boolean {
  const session = getSession();
  return !!(session && session.expiresAt > Date.now());
}

export function deleteSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
