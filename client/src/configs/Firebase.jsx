const envFBConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || {});

export const firebaseConfig = {
  apiKey: envFBConfig.apiKey,
  authDomain: envFBConfig.authDomain,
  projectId: envFBConfig.projectId,
  storageBucket: envFBConfig.storageBucket,
  messagingSenderId: envFBConfig.messagingSenderId,
  appId: envFBConfig.appId,
  measurementId: envFBConfig.measurementId,
};
