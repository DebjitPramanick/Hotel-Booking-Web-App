// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3VHRbj4knFBXK3YVFdsr7xn2MvE1A0_E",
    authDomain: "hotel-booking-app-2c070.firebaseapp.com",
    projectId: "hotel-booking-app-2c070",
    storageBucket: "hotel-booking-app-2c070.appspot.com",
    messagingSenderId: "308536271440",
    appId: "1:308536271440:web:cf389c892a5fa653486755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {
    storage
}
