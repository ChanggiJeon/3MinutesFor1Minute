import { createSlice } from '@reduxjs/toolkit';

const memberInitialState = {
	id: 0,
	nickname: '',
	bio: '',
	is_admin: false,
	is_active: false,
	created_at: '',
	image: null,
	user: 0,
	community: 0,
};

const member = createSlice({
	name: 'member',
	initialState: memberInitialState,
	reducers: {
		getMemberData: (_, action) => action.payload,
		updateMemberData: (state, action) => ({ ...state, ...action.payload }),
	},
});

export const { getMemberData, updateMemberData } = member.actions;

export default member.reducer;
