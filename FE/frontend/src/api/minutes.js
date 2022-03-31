import axios from 'axios';
import { BASE_URL,setToken } from './utils';

async function getAllMinutes( communityId ) {
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
		return err.response.data
	}
}

async function createMinutes( communityId, data ) {
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
		return err.response.data
	}
}

export default getAllMinutes