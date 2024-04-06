require('dotenv').config();
import 'express-async-errors';
import path from 'path';

import express from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.use(errorHandler);

const MONGODB_URI: string = process.env.MONGODB_URI || '';

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connection success');
	})
	.catch(() => {
		console.log('connection failed');
	});

export default app;
