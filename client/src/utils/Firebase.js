// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = PASTE_FIREBASE_CONFIG;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {
    storage
}
