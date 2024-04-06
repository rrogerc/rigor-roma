import UserModel from '../routes/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser, DecodedToken } from '../types';

const userExtractor = async (
	req: Request,
	response: Response,
	next: NextFunction
) => {
	const request = req as RequestWithUser;

	const authorization = request.get('authorization');

	if (!authorization || !authorization.startsWith('Bearer '))
		return response.status(401).json({ error: 'token missing or invalid' });

	const token = authorization.substring(7);

	let decodedToken: DecodedToken;
	try {
		decodedToken = jwt.verify(
			token,
			process.env.SECRET as string
		) as DecodedToken;
	} catch {
		return response.status(401).json({ error: 'token invalid' });
	}

	if (!decodedToken.id)
		return response.status(401).json({ error: 'token invalid' });

	request.user = await UserModel.findById(decodedToken.id);
	next();
};

export default userExtractor;
