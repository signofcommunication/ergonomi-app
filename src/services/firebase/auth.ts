import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from 'firebase/auth';

import { auth } from 'src/boot/firebase';

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
