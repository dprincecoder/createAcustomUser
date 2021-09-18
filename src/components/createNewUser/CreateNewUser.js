import React, { useState } from "react";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import "./createNewUser.scss";
import { auth, handleUserProfile } from "../../firebase/function";
import AuthWrapper from "../authWrapper/AuthWrapper";

const CreateNewUser = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [displayName, setDisplayName] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");

	//reset form field
	const resetForm = () => {
		setEmail("");
		setConfirmPassword("");
		setDisplayName("");
		setFirstname("");
		setLastname("");
		setErrors([]);
		setPassword("");
	};

	//create user
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			const newError = [
				"Password don't match, check your password and try again.",
			];
			setErrors(newError);
			return;
		}

		try {
			const { user } = auth
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					alert("user created");
				})
				.catch((err) => {
					setErrors([err.message]);
				});

			await handleUserProfile(user, { displayName });

			resetForm();
		} catch (error) {
			console.log(error);
		}
	};
	const config = {
		headline: "REGISTER",
	};
	return (
		<AuthWrapper {...config}>
			{errors.length > 0 && (
				<ul>
					{errors.map((err, i) => (
						<li key={i}>{err}</li>
					))}
				</ul>
			)}

			<form onSubmit={handleSubmit}>
				<FormInput
					type="test"
					name="displayName"
					value={displayName}
					placeholder="Enter DisplayName"
					handleChange={(e) => setDisplayName(e.target.value)}
				/>
				<FormInput
					type="email"
					name="email"
					value={email}
					placeholder="Enter Email"
					handleChange={(e) => setEmail(e.target.value)}
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					placeholder="Enter Password"
					handleChange={(e) => setPassword(e.target.value)}
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					placeholder="Confirm Password"
					handleChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<Button type="submit">REGISTER</Button>
			</form>
		</AuthWrapper>
	);
};

export default CreateNewUser;
