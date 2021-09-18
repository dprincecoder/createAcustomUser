import firebase from "firebase/app";
import "firebase/storage";
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from './config'
import dummyAvater from '../dummyAvatar.png'

firebase.initializeApp(firebaseConfig);


const DB = firebase.firestore(); //create a database from firebase firestore

const auth = firebase.auth(); //authorize users using firebase auth

const provider = new firebase.auth.GoogleAuthProvider(); //let google be our firebase authorization


export const handleUserProfile = async ( userAuth, additionalData ) => {
	if (!userAuth) return;
	const { uid } = userAuth;
	
	//check if this user info exist in our database
	const userRef = DB.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email, photoURL } = userAuth;
		const timestamp = new Date();
		const profilePic = !photoURL ? dummyAvater : photoURL;

		try {
			await userRef.set({
				displayName,
				email,
				profilePic,
				firstname: "",
				lastname: "",
				createdDate: timestamp,
				...additionalData,
			});
		} catch (err) {
			console.log(err);
		}
	}
	return userRef;
};


//exports our modules
export { auth, provider };
export default DB;
