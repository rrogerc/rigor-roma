import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { User } from '../types';

const userSchema = new mongoose.Schema<User>({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
	},
	password: {
		type: String,
		required: true,
	},
	rigor: [
		{
			date: {
				type: Date,
				required: true,
			},
			minutesFocused: {
				type: Number,
				required: true,
				min: 0,
			},
		},
	],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<User>('User', userSchema);
