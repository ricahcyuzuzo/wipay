import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBe4xOruz9h_ac-ZC6QbWJ1uqzcZZUNfeg",
    authDomain: "solarshop-e86ad.firebaseapp.com",
    projectId: "solarshop-e86ad",
    storageBucket: "solarshop-e86ad.appspot.com",
    messagingSenderId: "578561483387",
    appId: "1:578561483387:web:833c3926b184611a07b8de",
    measurementId: "G-2J2C3SW8GY"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
