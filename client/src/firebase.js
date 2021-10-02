import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCKHMWaK7uNgubJOgU8JbQgSFBKxII__1E",
  authDomain: "tiendaonline-327813.firebaseapp.com",
  projectId: "tiendaonline-327813",
  storageBucket: "tiendaonline-327813.appspot.com",
  messagingSenderId: "1067132800144",
  appId: "1:1067132800144:web:7763169d46fabc6f435c15",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
export { auth, db, provider };
