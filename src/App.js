import React, {useState, useEffect} from 'react'
import { Switch, Route} from "react-router-dom"
import './default.scss';
import MainLayouts from "./layouts/MainLayouts";
import HomepageLayout from "./layouts/HomepageLayout";

import {auth, handleUserProfile} from './firebase/function'

//pages
import Homepage from './pages/homepage/Homepage';
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import Recovery from "./pages/recovery/Recovery"
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'
import Dashboard from './pages/dashboard/Dashboard';

//higherOtherComponent
import WithAuth from './higherOtherComponent/withAuth'

const App =  () => {
	const dispatch = useDispatch()

	useEffect(() =>  {
		const authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					dispatch(setCurrentUser({
						id: snapshot.id,
						...snapshot.data()
					}))
				})
			}
			
			dispatch(setCurrentUser(userAuth));
		})
		return () => {authListener()}
	}, [])

	
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<HomepageLayout>
						<Homepage />
					</HomepageLayout>
				</Route>
				<Route exact path="/register">
						<MainLayouts>
							<Register />
						</MainLayouts>
				</Route>
				<Route exact path="/login">
						<MainLayouts>
							<Login />
						</MainLayouts>
				</Route>
				<Route exact path="/recovery">
					<MainLayouts>
						<Recovery />
					</MainLayouts>
				</Route>
				<Route exact path="/dashboard">
					<WithAuth>
					<MainLayouts>
						<Dashboard />
					</MainLayouts>
					</WithAuth>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
