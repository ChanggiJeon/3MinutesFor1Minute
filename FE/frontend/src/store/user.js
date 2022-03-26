import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
	isLoggedIn: false,
	username: '',
	profile: '',
};

const user = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		login: (_, action) => {
			const { isLoggedIn } = action.payload;

			return { isLoggedIn };
		},
		logout: (_, __) => userInitialState,
	},
});

export const authMiddleware = _ => next => action => {
	if (user.actions.login.match(action)) {
		const { access, refresh } = action.payload;

		localStorage.setItem('access', access);
		localStorage.setItem('refresh', refresh);
	} else if (user.actions.logout.match(action)) {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
	}

	return next(action);
};

export const { login, logout } = user.actions;

export default user.reducer;
