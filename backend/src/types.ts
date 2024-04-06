import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface Rigor {
	date: Date;
	minutesFocused: number;
}

export interface User {
	_id: string;
	username: string;
	password: string;
	rigor: Rigor[];
}

export interface RequestWithUser extends Request {
	user?: User | null | undefined;
}

export interface DecodedToken extends JwtPayload {
	id: string;
}
