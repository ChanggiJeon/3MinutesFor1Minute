import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiCreateCommunity = ({ name, isPrivate, intro }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/community/create/`,
		data: {
			name,
			is_private: isPrivate,
			intro,
		},
		headers: {
			...setToken(),
		},
	});

export const apiUniqueCheckCommunityName = ({ name }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/uniquecheck/community_name/`,
		data: {
			name,
		},
		headers: {
			...setToken(),
		},
	});
