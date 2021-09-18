import React, { useEffect, useState } from "react";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import "./createNewUser.scss";
import AuthWrapper from "../authWrapper/AuthWrapper";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../redux/user/user.action";

const mapState = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError,
})
const CreateNewUser = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [displayName, setDisplayName] = useState("");

	const {signUpError, signUpSuccess} = useSelector(mapState)
	const history = useHistory();
	const dispatch = useDispatch()

	useEffect(() => {
		if (signUpSuccess) {
			resetForm();
			history.push('/')
		}
	}, [signUpSuccess]);

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setErrors(signUpError)
		}
	}, [signUpError]);

	//reset form field
	const resetForm = () => {
		setEmail("");
		setConfirmPassword("");
		setDisplayName("");
		setErrors([]);
		setPassword("");
	};

	//create user
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createNewUser({displayName, email, password, confirmPassword}))
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
