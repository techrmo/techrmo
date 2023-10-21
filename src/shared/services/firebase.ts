import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAVs3uxSRXfhxPw-URkB5W3e0vhze6okCM',
  authDomain: 'auth.techrmo.app',
  projectId: 'techrmo',
  storageBucket: 'techrmo.appspot.com',
  messagingSenderId: '1091190775141',
  appId: '1:1091190775141:web:63f61d6c83ba11f866958c',
  measurementId: 'G-ZMB5VYM9YW',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
