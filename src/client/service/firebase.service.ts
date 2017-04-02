import { config } from "../app.config";
import * as firebaseClient from 'firebase';

export const firebase = firebaseClient.initializeApp(config.firebase);
export const database = firebase.database();

let provider = new firebaseClient.auth.GoogleAuthProvider();
export const loggedIn = firebase.auth().signInWithPopup(provider);


