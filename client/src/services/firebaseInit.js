import firebaseConfig from "./firebaseConfig";
import firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore();
