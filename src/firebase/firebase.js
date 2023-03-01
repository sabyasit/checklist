import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDcbZDLLIXOABH8CvgzCV_gM8Vlk8vsva8",
  authDomain: "checklist-6c511.firebaseapp.com",
  projectId: "checklist-6c511",
  storageBucket: "checklist-6c511.appspot.com",
  messagingSenderId: "143961146319",
  appId: "1:143961146319:web:4fe45d0b6e7581099808ba"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db;