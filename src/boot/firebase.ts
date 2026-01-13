import { boot } from 'quasar/wrappers';
import { initializeApp, type FirebaseApp, getApps } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  // Optional (used by Analytics). Not enabled yet per requirements.
  measurementId?: string;
};

function getFirebaseConfig(): FirebaseWebConfig {
  const {
    VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID,
    // Optional if you add it later
    VITE_FIREBASE_MEASUREMENT_ID,
  } = import.meta.env as ImportMetaEnv & { VITE_FIREBASE_MEASUREMENT_ID?: string };

  const baseConfig: FirebaseWebConfig = {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_FIREBASE_APP_ID,
  };

  if (VITE_FIREBASE_MEASUREMENT_ID) {
    return {
      ...baseConfig,
      measurementId: VITE_FIREBASE_MEASUREMENT_ID,
    };
  }

  return baseConfig;
}

function initFirebaseApp(): FirebaseApp {
  // Prevent multiple initializations in Vite HMR / Capacitor reload
  if (getApps().length) return getApps()[0]!;
  return initializeApp(getFirebaseConfig());
}

export const firebaseApp: FirebaseApp = initFirebaseApp();
export const auth: Auth = getAuth(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);

export default boot(() => {
  // Boot file ensures Firebase is initialized early in app lifecycle.
  // Analytics is intentionally NOT initialized.
});
