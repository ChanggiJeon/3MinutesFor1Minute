import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiLogin = ({ username, password }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/api/token/`,
		data: {
			username,
			password,
		},
	});

export const apiRefreshToken = ({ refresh }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/api/token/refresh/`,
		data: {
			refresh,
		},
	});

export const apiSignup = ({
	id,
	password,
	passwordConfirmation,
	name,
	email,
}) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/accounts/signup/`,
		data: {
			username: id,
			password,
			password_confirm: passwordConfirmation,
			name,
			email,
		},
	});

export const apiUniqueCheckId = ({ id }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/uniquecheck/username/${id}/`,
	});

export const apiUniqueCheckEmail = ({ email }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/uniquecheck/email/${email}/`,
	});

export const apiGetMyProfile = () =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/self/`,
		headers: {
			...setToken(),
		},
	});

export const apiFindId = ({ email, name }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/find/username/${email}/${name}/`,
	});

export const apiFindPw = ({ username, email, name }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/accounts/find/password/${username}/${email}/${name}/`,
	});

export const apiDeleteUser = ({ username, password }) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/accounts/delete/`,
		data: {
			username,
			password,
		},
		headers: {
			...setToken(),
		},
	});

export const apiUpdateUser = ({
	username,
	password,
	newPassword,
	newPasswordConfirmation,
}) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/accounts/update/`,
		data: {
			username,
			password,
			new_password: newPassword,
			new_password_confirm: newPasswordConfirmation,
		},
		headers: {
			...setToken(),
		},
	});

export const apiUpdateProfileImage = ({ formData }) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/accounts/update/`,
		data: formData,
		headers: {
			...setToken(),
		},
	});
