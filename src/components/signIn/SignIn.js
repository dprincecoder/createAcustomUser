import React, { useEffect, useState } from "react";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import AuthWrapper from "../authWrapper/AuthWrapper";
import "./signIn.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signInWithGoogle } from "../../redux/user/user.action";

const mapState = ({ user }) => ({
	signInSuccess: user.signInSuccess
})

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const { signInSuccess } = useSelector(mapState);

	const history = useHistory()
	const dispatch = useDispatch();

	useEffect(() => {
		if (signInSuccess) {
			resetForm();
			history.push('/');
			
		}
	}, [signInSuccess])

	const resetForm = () => {
		setEmail("");
		setPassword("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(signInUser({ email, password }));
	};

	const handleGoogleSignIn = e => {
		dispatch(signInWithGoogle());
	}

	const config = {
		headline: "LOGIN",
	};
	return (
		<AuthWrapper className="signIn" {...config}>
			{errors.length > 0 && (
				<ul>
					{errors.map((err, i) => (
						<li key={i}>{err}</li>
					))}
				</ul>
			)}
			<div className="formGrap">
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Enter your email address"
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Enter your password"
						handleChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit">LOGIN</Button>
				</form>
				<div className="socialSign">
					<div className="row">
						<Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
					</div>
				</div>
				<p>
					Forgot Password? <Link to="/recovery">Recover it</Link>
				</p>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
