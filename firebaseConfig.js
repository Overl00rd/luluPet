import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cole aqui as credenciais do seu projeto (Firebase Console > Configurações do projeto > Seus apps > Web)

const firebaseConfig = {
  apiKey: "AIzaSyBpI5IksQzBEoorfVLN3ipzsB0zBxNVFR0",
  authDomain: "lulupet-4ce8e.firebaseapp.com",
  projectId: "lulupet-4ce8e",
  storageBucket: "lulupet-4ce8e.firebasestorage.app",
  messagingSenderId: "496199840094",
  appId: "1:496199840094:web:096a53129bca2ae5a25fcf"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// evita o erro "auth/already-initialized" ao recarregar o app
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
