import axios from 'axios';

const baseUrl = '/api/users';

let token: string | null = null;

export const setToken = (newToken: string) => {
	token = `Bearer ${newToken}`;
};

export const getUser = (id: string) => {
	const config = { headers: { Authorization: token } };
	const request = axios.get(`${baseUrl}/${id}`, config);

	return request.then((response) => response.data);
};

export const addMinutes = (minutes: number, id: string) => {
	const config = { headers: { Authorization: token } };
	const request = axios.put(`${baseUrl}/${id}/add`, { minutes }, config);

	return request.then((response) => response.data);
};

export const userCreate = (username: string, password: string) => {
	const request = axios.post(baseUrl, { username, password });

	return request.then((response) => response.data);
};
