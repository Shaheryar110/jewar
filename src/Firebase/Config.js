import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4rVYoShL1v0hr4io8xB3mgwjkx00k1Iw",
  authDomain: "jewar-54cc4.firebaseapp.com",
  projectId: "jewar-54cc4",
  storageBucket: "jewar-54cc4.appspot.com",
  messagingSenderId: "795307715546",
  appId: "1:795307715546:web:a6989ef81062a47500aee3",
  measurementId: "G-CP31Q4TBK9"
};

export const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app); 
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);