import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export async function getAllMinutes(communityId) {
	try {
		const response = await axios({
			method: 'get',
			url: `${BASE_URL}/${communityId}/minutes/`,
			headers: {
				...setToken(),
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function createMinutes(communityId, data) {
	try {
		const { title, content, deadline, participants } = data;

		const response = await axios({
			method: 'post',
			url: `${BASE_URL}/${communityId}/minutes/create/`,
			data: {
				title,
				content,
				deadline,
				participants,
			},
			headers: {
				...setToken(),
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function detailMinutes(communityId, minutesId) {
	try {
		const response = await axios({
			method: 'get',
			url: `${BASE_URL}/${communityId}/minutes/${minutesId}/`,
			headers: {
				...setToken(),
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function deleteMinutes(communityId, minutesId) {
	try {
		const response = await axios({
			method: 'delete',
			url: `${BASE_URL}/${communityId}/minutes/${minutesId}/delete/`,
			headers: {
				...setToken(),
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}
