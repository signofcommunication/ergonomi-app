import {
  doc,
  setDoc,
  type Firestore,
  type DocumentReference,
  type SetOptions,
} from 'firebase/firestore';

import { db } from 'src/boot/firebase';

export { db };
export type { Firestore };

export type UserProgress = {
  materiCompleted: string[];
  postureCompleted: boolean;
  stretchCompleted: boolean;
  updatedAt?: unknown;
};

/**
 * Placeholder: persist user progress.
 * NOTE: Intentionally not implemented yet per requirements.
 */
export async function saveUserProgress(
  userId: string,
  _progress: UserProgress,
  _options?: SetOptions,
): Promise<void> {
  // TODO: Implement later (Firestore write)
  // Example structure (disabled for now):
  // const ref = doc(db, 'users', userId, 'meta', 'progress');
  // await setDoc(ref, { ...progress, updatedAt: serverTimestamp() }, { merge: true });
  void userId;
}

/**
 * Placeholder: document reference for user progress.
 */
export function userProgressRef(userId: string): DocumentReference {
  return doc(db, 'users', userId, 'meta', 'progress');
}
