import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCKtYkU94fLBvgLfAAw9au0RhhDH3xsWo",
  authDomain: "search-b89e8.firebaseapp.com",
  projectId: "search-b89e8",
  storageBucket: "search-b89e8.appspot.com",
  messagingSenderId: "815481785952",
  appId: "1:815481785952:web:c93eb2a5d17a81bf12fd05",
  measurementId: "G-HG2VSYPCWC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

console.log(analytics)

const db = getFirestore(firebaseApp)

export { db }
