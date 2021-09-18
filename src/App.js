import React, {useState, useEffect} from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import './default.scss';
import MainLayouts from "./layouts/MainLayouts";
import HomepageLayout from "./layouts/HomepageLayout";

import {auth, handleUserProfile} from './firebase/function'

//pages
import Homepage from './pages/homepage/Homepage';
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import Recovery from "./pages/recovery/Recovery"

const App =  () => {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() =>  {
		const authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data()
					})
				})
			}
			
			setCurrentUser()
		})
		return () => {authListener()}
	}, [])

	
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<HomepageLayout currentUser={currentUser}>
						<Homepage />
					</HomepageLayout>
				</Route>
				<Route exact path="/register">
					{currentUser ? (
						<Redirect to="/" />
					) : (
						<MainLayouts currentUser={currentUser}>
							<Register />
						</MainLayouts>
					)}
				</Route>
				<Route exact path="/login">
					{currentUser ? (
						<Redirect to="/" />
					) : (
						<MainLayouts currentUser={currentUser}>
							<Login />
						</MainLayouts>
					)}
				</Route>
				<Route exact path="/recovery">
						<MainLayouts>
							<Recovery />
						</MainLayouts>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
