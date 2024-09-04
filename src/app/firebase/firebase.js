// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // authDomain: "next-qwik-chat.firebaseapp.com",
  // projectId: "next-qwik-chat",
  // storageBucket: "next-qwik-chat.appspot.com",
  // messagingSenderId: "344119170090",
  // appId: "1:344119170090:web:3de2fc9a7b028273dc1f53",
// };

// const app = initializeApp(firebaseConfig);

// export const auth  = getAuth()
// export const db  = getFirestore()
// export const storage  = getStorage()






// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_API_KEY,
   authDomain: "next-qwik-chat.firebaseapp.com",
  projectId: "next-qwik-chat",
  storageBucket: "next-qwik-chat.appspot.com",
  messagingSenderId: "344119170090",
  appId: "1:344119170090:web:3de2fc9a7b028273dc1f53",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()