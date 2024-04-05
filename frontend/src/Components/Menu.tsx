import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearUser } from '../reducers/userReducer';
import { notifyLogout } from '../reducers/notificationReducer';
import { AppDispatch, RootState } from '../store';
import { UserState } from '../types';

const Menu: React.FC = () => {
	const user = useSelector<RootState, UserState | null>((state) => state.user);
	const isRunning = useSelector<RootState, boolean>((state) => state.running);
	const isLoggedIn = user !== null;

	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();

	const handleLogout = () => {
		dispatch(clearUser());
		dispatch(notifyLogout());
	};

	if (isRunning) return null;

	return (
		<nav className="bg-gray-100 shadow-md p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-xl font-semibold">
					RigorRoma
				</Link>
				<div className="hidden md:flex space-x-4">
					<Link to="/timer" className="text-gray-700 hover:text-gray-900">
						Timer
					</Link>
					<Link to="/stopwatch" className="text-gray-700 hover:text-gray-900">
						Stopwatch
					</Link>
					<Link to="/statistics" className="text-gray-700 hover:text-gray-900">
						Statistics
					</Link>
				</div>
				{location.pathname !== '/login' &&
					(isLoggedIn ? (
						<button
							onClick={handleLogout}
							className="text-gray-700 border border-gray-300 hover:bg-gray-200 px-3 py-1 rounded"
						>
							Logout
						</button>
					) : (
						<Link
							to="/login"
							className="text-gray-700 border border-green-500 hover:bg-green-500 hover:text-white px-3 py-1 rounded"
						>
							Login
						</Link>
					))}
			</div>
		</nav>
	);
};

export default Menu;
