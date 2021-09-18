import React from 'react'
import './header.scss'
import logo from './dpLogo1.png'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/function'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../redux/user/user.action'

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const Header = () => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logOutUser());
	}

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
									<img
										className="userLogo"
										src={currentUser.profilePic}
										alt=""
									/>
									<b>{currentUser.displayName}</b>
								</li>
								<li>
									<Link to="/dashboard"> Dashboard</Link>
								</li>
								<li>
									<span onClick={handleLogout}>LOGOUT</span>
								</li>
							</ul>
						) : (
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
export default Header;
