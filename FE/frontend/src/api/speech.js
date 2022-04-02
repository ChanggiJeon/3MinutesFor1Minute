import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export default async function createSpeech(comId, minId, data) {
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
		console.log('response', response);
		return response.data;
	} catch (err) {
		return err.response.data;
	}
}
