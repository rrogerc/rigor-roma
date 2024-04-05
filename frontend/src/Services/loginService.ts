import axios from 'axios';

const baseUrl = '/api/login';

interface UserCredentials {
	username: string;
	password: string;
}

export const login = async (credentials: UserCredentials) => {
	const response = await axios.post(baseUrl, credentials);

	return response.data;
};
