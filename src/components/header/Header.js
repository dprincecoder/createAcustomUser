import React from 'react'
import './header.scss'
import logo from './dpLogo1.png'
import { Link } from 'react-router-dom'
import {auth} from '../../firebase/function'
const Header = (props) => {
	const {currentUser} = props
    return (
			<header className="header">
				<div className="wrap">
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="dprincecoder logo" />
						</Link>
					</div>

				<div className="callToActions">
					{currentUser ? (
						<ul className="user">
							<li className="userDetails">
								<img className="userLogo" src={currentUser.profilePic} alt="" />
								<b>{currentUser.displayName}</b>
							</li>
							<li>
								<span onClick={() => auth.signOut()}>LOGOUT</span>
							</li>
						</ul>
					): (
						<ul>
							<li>
								<Link to="/register"> Register</Link>
							</li>
							<li>
								<Link to="/login"> Login</Link>
							</li>
						</ul>
					)}
					</div>
				</div>
			</header>
		);
}

Header.defaultProps = {
	currentUser: null
}
export default Header
