import React, { useState, useEffect } from "react";
import AuthWrapper from "../authWrapper/AuthWrapper";
import FormInput from "../forms/formInput/FormInput";
import Button from "../forms/button/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {passwordRecovery} from '../../redux/user/user.action'

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	resetPasswordError: user.resetPasswordError
})
const Recover = () => {
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState([]);
	const history = useHistory()
	const dispatch = useDispatch()
	const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState)


	useEffect(() => {
		if (resetPasswordSuccess) {
			history.push('/login')
		}
	 }, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
				setErrors(resetPasswordError)
		}
	}, [resetPasswordError]);
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(passwordRecovery({ email }));
		
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
