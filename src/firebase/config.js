import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhJsooEKRJIPDOEKDyXWBpan8MVBumZQI",
  authDomain: "fxalerts-51c9d.firebaseapp.com",
  databaseURL: "https://fxalerts-51c9d.firebaseio.com",
  projectId: "fxalerts-51c9d",
  storageBucket: "fxalerts-51c9d.appspot.com",
  messagingSenderId: "123557275262",
  appId: "1:123557275262:web:01ad45c66f823350245a2f",
  measurementId: "G-DZVQ4G8JPJ"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };