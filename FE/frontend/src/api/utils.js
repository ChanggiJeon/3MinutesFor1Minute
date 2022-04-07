export const BASE_URL = process.env.REACT_APP_API_URL;

export const setToken = () => {
	const token = localStorage.getItem('access') || '';
	const config = {
		Authorization: `Bearer ${token}`,
	};
	return config;
};