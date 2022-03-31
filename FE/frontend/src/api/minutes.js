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

export async function createMinutes(communityId, formData) {
	try {
		console.log('formData', formData);
		// const { title, content, deadline, memberIds, referenceFile } = data;

		const response = await axios({
			method: 'post',
			url: `${BASE_URL}/${communityId}/minutes/create/`,
			data: formData,
			// {
			// 	title,
			// 	content,
			// 	deadline,
			// 	reference_file: referenceFile[0],
			// 	member_ids: memberIds,
			// },
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

export async function updateMinutes(comId, minId, data) {
	try {
		const { title, content, deadline, memberIds, referenceFile } = data;

		const response = await axios({
			method: 'post',
			url: `${BASE_URL}/${comId}/minutes/${minId}/update`,
			data: {
				title,
				content,
				deadline,
				member_ids: memberIds,
				reference_file: referenceFile,
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
