import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";


const firebaseConfig = {

  apiKey: "AIzaSyBj-0RFpnX-oKCNdZ-FfES6GttbFy29DHI",
  authDomain: "fir-javascript-crud-cd0e4.firebaseapp.com",
  projectId: "fir-javascript-crud-cd0e4",
  storageBucket: "fir-javascript-crud-cd0e4.appspot.com",
  messagingSenderId: "571360078714",
  appId: "1:571360078714:web:7480ba312ff8dcf3e2c4c3",
  measurementId: "G-CF85GN94B5"
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 *
 * @param {string} title 
 * @param {string} description 
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));




