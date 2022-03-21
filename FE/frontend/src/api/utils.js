export const BASE_URL = 'http://localhost:8000/api';

export const setToken = () => {
	const token = localStorage.getItem('access') || '';
	const config = {
		Authorization: `JWT ${token}`,
	};
	return config;
};
