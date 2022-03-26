import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer, { authMiddleware } from './user';
import postsReducer from './posts';

export default configureStore({
	reducer: {
		user: userReducer,
    posts: postsReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authMiddleware),
});
