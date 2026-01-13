import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';

import { db } from 'src/boot/firebase';

export type UserRole = 'admin' | 'user';

export type UserProfile = {
  role: UserRole;
  isActive: boolean;
  // Optional metadata
  email?: string;
  displayName?: string;
};

export type UserRow = {
  id: string; // uid
} & UserProfile;

export function userDocRef(uid: string) {
  return doc(db, 'users', uid);
}

/**
 * Fetch current user's profile from `users/{uid}`.
 * NOTE: This does not create/update anything.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(userDocRef(uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

/**
 * Admin: list users.
 * Example Firestore query with optional filtering.
 */
export async function listUsers(params?: {
  onlyActive?: boolean;
  role?: UserRole;
  pageSize?: number;
}): Promise<UserRow[]> {
  const constraints: QueryConstraint[] = [];

  if (params?.onlyActive === true) {
    constraints.push(where('isActive', '==', true));
  }

  if (params?.role) {
    constraints.push(where('role', '==', params.role));
  }

  constraints.push(limit(params?.pageSize ?? 50));

  const q = query(collection(db, 'users'), ...constraints);
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as UserRow[];
}

/**
 * Admin: activate/deactivate user.
 * NOTE: This updates Firestore, so call only from a deliberate admin UI.
 */
export async function setUserActive(uid: string, isActive: boolean): Promise<void> {
  await updateDoc(userDocRef(uid), { isActive });
}
