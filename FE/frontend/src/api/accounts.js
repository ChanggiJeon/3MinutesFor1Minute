import axios from 'axios';
import { BASE_URL } from './utils';

export const apiLogin = ({ username, password }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/api/token/`,
		data: {
			username,
			password,
		},
	});

export const apiRefreshToken = refresh =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/api/token/refresh/`,
		data: {
			refresh,
		},
	});

export const apiSignup = ({
	username,
	password,
	passwordConfirmation,
	email,
}) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/signup/`,
		data: {
			username,
			password,
			password_confirmation: passwordConfirmation,
			email,
		},
	});
