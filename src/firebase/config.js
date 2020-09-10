import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
 const firebaseConfig = {
    apiKey: "AIzaSyD15HB7oY4yR9HOy23NB7PCaGF9UIeSVx4",
    authDomain: "fxalerts-24a2d.firebaseapp.com",
    databaseURL: "https://fxalerts-24a2d.firebaseio.com",
    projectId: "fxalerts-24a2d",
    storageBucket: "fxalerts-24a2d.appspot.com",
    messagingSenderId: "762894301670",
    appId: "1:762894301670:web:56aa2f97769684373f7e27",
    measurementId: "G-7RBRKEKFYW"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };