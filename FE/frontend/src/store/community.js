import { createSlice } from '@reduxjs/toolkit';

const communityInitialState = {
	id: 0,
	name: '',
	intro: '',
	private_code: '',
	image: '',
	is_private: false,
	member_set: [],
};

const community = createSlice({
	name: 'community',
	initialState: communityInitialState,
	reducers: {
		getCommunityData: (_, action) => action.payload,
		updateCommunityData: (state, action) => ({ ...state, ...action.payload }),
	},
});

export const { getCommunityData, updateCommunityData } = community.actions;

export default community.reducer;
