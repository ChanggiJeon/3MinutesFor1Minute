import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer, { authMiddleware } from './user';

export default configureStore({
	reducer: {
		user: userReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authMiddleware),
});
