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
		login: (_, action) => action.payload,
		logout: (_, __) => userInitialState,
	},
});

export const { login, logout } = user.actions;

export default user.reducer;
