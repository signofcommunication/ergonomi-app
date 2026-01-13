import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from 'firebase/auth';

import { auth } from 'src/boot/firebase';
import { getUserProfile, type UserProfile } from './users';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<UserCredential> {
  const { email, password } = payload;
  return signInWithEmailAndPassword(auth, email, password);
}

export async function register(payload: RegisterPayload): Promise<UserCredential> {
  const { email, password } = payload;
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export type SessionState =
  | {
      status: 'loading';
    }
  | {
      status: 'guest';
    }
  | {
      status: 'authenticated';
      user: User;
      profile: UserProfile | null;
    };

/**
 * Wait until Firebase Auth finishes restoring persisted session.
 */
export function waitForAuthReady(): Promise<User | null> {
  return new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, (u) => {
      stop();
      resolve(u);
    });
  });
}

/**
 * Get current session + role/isActive from Firestore.
 * NOTE: This only reads `users/{uid}`; it does NOT create/update user docs.
 */
export async function getSession(): Promise<SessionState> {
  const user = auth.currentUser;
  if (!user) return { status: 'guest' };

  const profile = await getUserProfile(user.uid);
  return { status: 'authenticated', user, profile };
}

export function isAdmin(profile: UserProfile | null | undefined): boolean {
  return profile?.role === 'admin';
}

export function isActiveUser(profile: UserProfile | null | undefined): boolean {
  return profile?.isActive === true;
}
