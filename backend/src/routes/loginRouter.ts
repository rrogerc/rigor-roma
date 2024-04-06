require('dotenv').config();
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from './userModel';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const isCorrectPass =
		user === null ? false : await bcrypt.compare(password, user.password);

	if (!user || !isCorrectPass) {
		return response.status(401).json({
			error: 'invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET || '');
	response.status(200).send({ token, id: user._id });
});

export default loginRouter;
