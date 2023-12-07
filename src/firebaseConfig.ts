import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMWQZwlWHb7ddE6WZzQrQXgiDLCQ1euRs",
  authDomain: "move-helper-eb770.firebaseapp.com",
  projectId: "move-helper-eb770",
  storageBucket: "move-helper-eb770.appspot.com",
  messagingSenderId: "182706091688",
  appId: "1:182706091688:web:a3d054f97b11ba57b9349d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
