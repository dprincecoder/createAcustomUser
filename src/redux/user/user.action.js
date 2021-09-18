import userTypes from "./user.types";
import { auth, handleUserProfile, provider } from "../../firebase/function";

//action to update redux store
export const setCurrentUser = (user) => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

export const resetAllAuthForms = () => ({
	type: userTypes.RESET_AUTH_FORMS
})

//signIn user
export const signInUser = ({ email, password }) => async (dispatch) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

//createNewUser
export const createNewUser = ({ displayName, email, password, confirmPassword }) => async (dispatch) => {
		if (password !== confirmPassword) {
			const newError = [
				"Password don't match, check your password and try again.",
			];
			dispatch({
				type: userTypes.SIGN_UP_ERROR,
				payload: newError,
			});
			return;
		}

		try {
			const { user } = auth.createUserWithEmailAndPassword(email, password)
				.then(() => {
					dispatch({
						type: userTypes.SIGN_UP_SUCCESS,
						payload: true
					})
				})
				.catch((err) => {
					const newError = [err.message];
					dispatch({
						type: userTypes.SIGN_UP_ERROR,
						payload: newError
					})
				});
				await handleUserProfile(user, { displayName });

		} catch (error) {
			alert(error);
		}
	};


export const passwordRecovery = ({ email }) => async dispatch => {
	const redirectURL = {
		url: "http://localhost:3000/login",
	};
	try {
		await auth
			.sendPasswordResetEmail(email, redirectURL)
			.then(() => {
				dispatch({
					type: userTypes.RESET_PASSWORD_SUCCESS,
					payload: true
				})
			})
			.catch((err) => {
				const newErr = [err.message];
				dispatch({
					type: userTypes.RESET_PASSWORD_ERROR,
					payload: newErr
				})
			});
		
	} catch (error) {
		alert(error)
	}
}

export const signInWithGoogle = () => async dispatch => {
	try {
		
		await auth.signInWithPopup(provider).then(() => {
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		})
	} catch (error) {
		alert(error)
	}
}

export const logOutUser = () => dispatch => {
	try {
		auth.signOut().then(() => {
			dispatch({
				type: userTypes.RESET_AUTH_FORMS
			})
		})
		
	} catch (error) {
		alert(error)
	}
}