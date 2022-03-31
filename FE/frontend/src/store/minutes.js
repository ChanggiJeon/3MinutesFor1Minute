import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllMinutes, createMinutes, detailMinutes } from '../api/minutes';

const name = 'minutes';

export const fetchMinutesByComId = createAsyncThunk(
	`${name}/GET_ALL_MINUTES`,
	async comId => {
		const response = await getAllMinutes(comId);
		return response;
	}
);

export const createMinutesByData = createAsyncThunk(
	`${name}/CREATE_MINUTES`,
	async data => {
		const { comId, ...request } = data;
		const response = await createMinutes(comId, request);
		return response;
	}
);

export const DetailMinutesById = createAsyncThunk(
	`${name}/DETAIL_MINUTES`,
	async data => {
		const { communityId, minutesId } = data;
		const response = await detailMinutes(communityId, minutesId);
		return response;
	}
);

const minutes = createSlice({
	name,
	initialState: {
		allMinutes: [],
		singleMinutes: undefined,
	},
	reducers: {
		// standard reducer logic
	},
	extraReducers: {
		[fetchMinutesByComId.fulfilled]: (state, action) => {
			state.allMinutes = action.payload;
		},
		[DetailMinutesById.fulfilled]: (state, action) => {
			state.singleMinutes = action.payload;
		},
	},
});

export default minutes.reducer;
