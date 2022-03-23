import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import postsReducer from './posts';

export default configureStore({
	reducer: {
		user: userReducer,
    posts: postsReducer,
	},
});
