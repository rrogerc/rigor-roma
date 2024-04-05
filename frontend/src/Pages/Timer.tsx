import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';

import { addRigor } from '../reducers/userReducer';
import { finishFocus, notify } from '../reducers/notificationReducer';
import { setRunFalse, setRunTrue } from '../reducers/runningReducer';
import { AppDispatch } from '../store';

const Timer: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [time, setTime] = useState(0);
	const [initial, setInitial] = useState(0);

	const setTimer = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const minutesInput = e.currentTarget.elements[0] as HTMLInputElement;
		const minutes = Number(minutesInput.value);

		if (minutes === 0) {
			dispatch(
				notify({ msg: 'Time must be greater than 0 minutes', status: 'danger' })
			);
			return;
		}

		setInitial(minutes);
		dispatch(setRunTrue());

		minutesInput.value = '';
		setTime(minutes * 60);
	};

	useEffect(() => {
		if (time > 0) {
			const timer = setTimeout(() => setTime(time - 1), 1000);
			return () => {
				clearTimeout(timer);
			}; // cleanup, runs when time changes outside
		}
		if (time === 0 && initial !== 0) {
			dispatch(finishFocus(initial));
			dispatch(setRunFalse());
			dispatch(addRigor(initial));
			setInitial(0);
		}
	}, [time, initial, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(setRunFalse());
		};
	}, [dispatch]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex justify-center items-center min-h-screen flex-col mt-2"
		>
			<motion.h1
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				Timer
			</motion.h1>
			{time > 0 ? (
				<div className="mt-3 flex flex-col items-center">
					<h6 className="text-2xl text-primary-500">
						{Math.floor(time / 60)} Minutes
					</h6>
					<h6 className="text-yellow-400">{time % 60} seconds</h6>
				</div>
			) : null}
			{time === 0 ? (
				<>
					<form
						onSubmit={setTimer}
						id="setForm"
						className="flex flex-col items-center"
					>
						<Input type="number" min="0" step="1" />
						<Button
							type="submit"
							form="setForm"
							className="mt-3"
							color="primary"
						>
							Start
						</Button>
					</form>
				</>
			) : null}
		</motion.div>
	);
};

export default Timer;
