import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA4PZveQcu9vIVnt7-VG-gd0iTYhMolTJo",
    authDomain: "mi-primer-firebase-10d87.firebaseapp.com",
    projectId: "mi-primer-firebase-10d87",
    storageBucket: "mi-primer-firebase-10d87.firebasestorage.app",
    messagingSenderId: "61672364844",
    appId: "1:61672364844:web:47a585013a6e76b0146a89"
  };

  app.initializeApp(firebaseConfig)


export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()