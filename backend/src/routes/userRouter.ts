import express from 'express';
import bcrypt from 'bcrypt';

import User from './userModel';
import userExtractor from '../utils/userExtractor';
import { RequestWithUser } from '../types';

const userRouter = express.Router();

// REMOVE FOR PRODUCTION
userRouter.get('/', async (_request, response) => {
	let users = await User.find({});
	response.json(users);
});

userRouter.get(
	'/:id',
	userExtractor,
	async (request: RequestWithUser, response) => {
		if (!request.user || request.user._id.toString() !== request.params.id)
			return response.status(401).send('Unauthorized');

		const id = request.params.id;
		const user = await User.findById(id);
		response.json(user);
	}
);

userRouter.post('/', async (request, response, next) => {
	if (!request.body.password || !request.body.username)
		return response.status(400).send('Missing username or password');
	if (request.body.password.length < 5) {
		const error = new Error('Password must have minimum length of 5');
		error.name = 'ValidationError';
		return next(error);
	}
	if (request.body.username.length < 3) {
		const error = new Error('Username must have minimum length of 3');
		error.name = 'ValidationError';
		return next(error);
	}

	let user = new User({
		username: request.body.username,
		password: request.body.password,
		rigor: [],
	});

	const saltRounds = 10;
	user.password = await bcrypt.hash(user.password, saltRounds);

	await user.save();
	response.status(201).json(user);
});

userRouter.put(
	'/:id/add',
	userExtractor,
	async (request: RequestWithUser, response) => {
		const minutes = request.body.minutes;

		if (!request.user || request.user._id.toString() !== request.params.id)
			return response.status(401).send('Unauthorized');

		if (typeof minutes !== 'number')
			return response.status(400).send('Minutes must be a number');

		if (minutes < 0)
			return response.status(400).send('Minutes must be positive');

		const user = await User.findById(request.params.id);
		if (!user) return response.status(400).send('No User Found');

		const today = new Date();
		const curDay = new Date(
			Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
		);

		const existingRigor = user.rigor.find((r) => +r.date === +curDay);

		if (existingRigor) {
			existingRigor.minutesFocused += minutes;
		} else {
			user.rigor.push({
				date: curDay,
				minutesFocused: minutes,
			});
		}

		await user.save();
		response.status(200).send('Minutes added successfully!');
	}
);

export default userRouter;
