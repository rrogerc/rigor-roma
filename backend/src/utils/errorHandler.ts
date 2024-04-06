import { Request, Response, NextFunction } from 'express';

const errorHandler = (
	error: Error & { name: string; message: string },
	request: Request,
	response: Response,
	next: NextFunction
) => {
	if (error.name === 'ValidationError')
		return response.status(400).send({ error: error.message });
	else if (error.name === 'JsonWebTokenError')
		return response.status(401).json({ error: error.message }); // Adjusted the status code to 401 for unauthorized

	next(error);
};

export default errorHandler;
