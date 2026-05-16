import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyDZf0ghXfzx3d60mcXWF1JasQhBwz4yVHI",
  authDomain: "react-2-f4bd6.firebaseapp.com",
  projectId: "react-2-f4bd6",
  storageBucket: "react-2-f4bd6.firebasestorage.app",
  messagingSenderId: "971305442702",
  appId: "1:971305442702:web:05d80d6684a25d37ba58df"
};

initializeApp(firebaseConfig);
export const database = getFirestore();