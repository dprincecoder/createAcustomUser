import React, { useState } from "react";
import { signInWithGoogle, auth } from "../../firebase/function";
import Button from "../forms/button/Button";
import FormInput from "../forms/formInput/FormInput";
import AuthWrapper from "../authWrapper/AuthWrapper";
import "./signIn.scss";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const resetForm = () => {
		setEmail("");
		setPassword("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					console.log("success");
				})
				.catch((err) => {
					const newError = [err.message];
					setErrors(newError);
				});

			resetForm();
		} catch (error) {
			console.log(error);
		}
	};
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
					<div className="socialSign">
						<div className="row">
							<Button onClick={signInWithGoogle}>Sign In with Google</Button>
						</div>
					</div>
					<p>
						Forgot Password? <Link to="/recovery">Recover it</Link>
					</p>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
