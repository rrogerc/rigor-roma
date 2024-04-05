import React, { useEffect, useState } from 'react';
import { Button as NextUIButton } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { finishFocus } from '../reducers/notificationReducer';
import { addRigor } from '../reducers/userReducer';
import { setRunFalse, setRunTrue } from '../reducers/runningReducer';
import { AppDispatch } from '../store';

const Stopwatch: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (isRunning) {
			timer = setTimeout(() => setTime(time + 1), 1000);
		}
		return () => clearTimeout(timer); // cleanup, runs when time changes or component unmounts
	}, [time, isRunning]);

	useEffect(() => {
		return () => {
			dispatch(setRunFalse());
		};
	}, [dispatch]);

	const toggleTimer = () => {
		setIsRunning(!isRunning);
		if (!isRunning) {
			setTime(0);
			dispatch(setRunTrue());
		} else {
			const minutes = Math.floor(time / 60);
			if (minutes > 0) {
				dispatch(finishFocus(minutes));
				dispatch(addRigor(minutes));
			}
			dispatch(setRunFalse());
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex justify-center items-center min-h-screen flex-col mt-2"
		>
			<motion.h1
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="mb-3 text-3xl font-bold"
			>
				Stopwatch
			</motion.h1>
			{isRunning ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mt-3 mb-3 flex flex-col items-center"
				>
					<h6 className="text-2xl text-blue-500">
						{Math.floor(time / 60)} minutes
					</h6>
					<h6 className="text-yellow-400">{time % 60} seconds</h6>
				</motion.div>
			) : null}
			<NextUIButton
				color={isRunning ? 'danger' : 'primary'}
				onClick={toggleTimer}
			>
				{isRunning ? 'Stop' : 'Start'}
			</NextUIButton>
		</motion.div>
	);
};

export default Stopwatch;
