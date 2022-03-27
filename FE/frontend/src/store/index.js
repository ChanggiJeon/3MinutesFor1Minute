import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import minutesReducer from './minutes';

const reducer = combineReducers({
	user: userReducer,
	minutes: minutesReducer,
});

export default configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
});
