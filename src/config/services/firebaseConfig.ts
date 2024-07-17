/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCya7KGM3Rkzb5DOE7HOAiVHgJ-6R66ohw",
  authDomain: "ziny-9998.firebaseapp.com",
  projectId: "ziny-9998",
  storageBucket: "ziny-9998.appspot.com",
  messagingSenderId: "993066075159",
  appId: "1:993066075159:web:9ddf1eefe32b92914a0852",
  measurementId: "G-1E1CK2HQ9E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)