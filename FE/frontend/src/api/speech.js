import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export async function getSingleSpeech(comId, minId, spcId) {
	try {
		const response = await axios({
			method: 'get',
			url: `${BASE_URL}/${comId}/minutes/${minId}/speech/${spcId}/`,
			headers: {
				...setToken(),
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err.response.data;
	}
}
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
		console.log('response.data');
		console.log(response.data);
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

// comment API

export const apiCreateComment = ({ communityId, minuteId, speechId, content }) => 
	axios({
		method: 'post',
		url: `${BASE_URL}/${communityId}/minutes/${minuteId}/speech/${speechId}/comment/create/`,
		data: {
		content,
		},
		headers: {
		...setToken(),
		}
	});

  
export const apiPutComment = ({ communityId, minuteId, speechId, commentId, content }) => 
	axios({
	method: 'put',
	url: `${BASE_URL}/${communityId}/minutes/${minuteId}/speech/${speechId}/comment/${commentId}/update/`,
	data: {
		content,
	},
	headers: {
		...setToken(),
	}
	});

export const apiDeleteComment = ({ communityId, minuteId, speechId, commentId }) => 
	axios({
		method: 'delete',
		url: `${BASE_URL}/${communityId}/minutes/${minuteId}/speech/${speechId}/comment/${commentId}/delete/`,
		headers: {
		...setToken(),
		}
	});