import axios from 'axios';
import { setToken } from './utils';

const BASE_URL = 'http://127.0.0.1:8000/api'

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

export default getAllMinutes