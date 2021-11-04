import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBfU2fqM3i4-WM6hzL3dJgQmAv5xBGdqw8",
    authDomain: "sep-chat-18203.firebaseapp.com",
    projectId: "sep-chat-18203",
    storageBucket: "sep-chat-18203.appspot.com",
    messagingSenderId: "592732874349",
    appId: "1:592732874349:web:72d3e8d9b314d901b3c164"
  }).auth();