import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export async function createSpeech(comId, minId, data) {
	try {
		const response = await axios({
			method: 'post',
			url: `${BASE_URL}/${comId}/minutes/${minId}/speech/create/`,
			data,
			headers: {
				...setToken(),
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}
export async function updateSpeech(comId, minId, spcId, data) {
	try {
		const response = await axios({
			method: 'put',
			url: `${BASE_URL}/${comId}/minutes/${minId}/speech/${spcId}/update/`,
			data,
			headers: {
				...setToken(),
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}
export async function deleteSpeech(comId, minId, spcId) {
	try {
		const response = await axios({
			method: 'delete',
			url: `${BASE_URL}/${comId}/minutes/${minId}/speech/${spcId}/delete/`,
			headers: {
				...setToken(),
			},
		});
		return response.status;
	} catch (err) {
		return err.response.status;
	}
}
