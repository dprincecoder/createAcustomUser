import React, { useState } from "react";
import AuthWrapper from "../authWrapper/AuthWrapper";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import { auth } from "../../firebase/function";
import { useHistory } from "react-router";

const Recover = () => {
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState([]);
	const history = useHistory()

	const handleSubmit = async e => {
		e.preventDefault();
		const redirectURL = {
			url: "http://localhost:3000/login"
		}
		await auth.sendPasswordResetEmail(email, redirectURL).then(() => {
			history.push('/login')
		}).catch(err => {
			const newErr = [err.message];
			setErrors(newErr)
		})
	}
	const config = {
		headline: "RECOVERY",
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
					type="email"
					value={email}
					placeholder="Enter registerd email"
					handleChange={(e) => setEmail(e.target.value)}
				/>
				<Button type="submit">Recover</Button>
			</form>
		</AuthWrapper>
	);
};

export default Recover;
