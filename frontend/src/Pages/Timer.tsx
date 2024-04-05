import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';

import { addRigor } from '../reducers/userReducer';
import { finishFocus, notify, clear } from '../reducers/notificationReducer';
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
		dispatch(clear());

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
		>
			<motion.h1
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="mb-3 text-3xl font-bold"
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
					<form onSubmit={setTimer} id="setForm">
						<Input type="number" min="0" step="1" className="w-64" />
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
