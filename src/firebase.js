// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU9e0Bxn628DHhEPmy7qrOacI03U4oguA",
  authDomain: "linkedin-clone-e0427.firebaseapp.com",
  projectId: "linkedin-clone-e0427",
  storageBucket: "linkedin-clone-e0427.appspot.com",
  messagingSenderId: "388203941013",
  appId: "1:388203941013:web:c81b99fc146fa1c85bdf9c",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

const storage = getStorage(app);

const db = getFirestore();

export { auth, storage, provider };
export default db;
