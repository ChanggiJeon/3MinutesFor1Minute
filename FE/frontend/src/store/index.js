import { createStore } from 'redux';

let userState = {
	username: 'anonymous',
};

function user(state = userState, action) {
	let copyUser = {...state};
	switch (action.type) {
		case 'LOGIN':
			// api 통신 userdata 받아오고 username = username
			copyUser.username = 'username'
			return copyUser;
		case 'LOGOUT':
			copyUser.username = 'anonymous'
			return copyUser;
		default:
			return copyUser;
	}
}

export default user;