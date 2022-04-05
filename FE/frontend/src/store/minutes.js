import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getAllMinutes,
	createMinutes,
	detailMinutes,
	deleteMinutes,
	updateMinutes,
} from '../api/minutes';

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
		// const { comId, ...request } = data;
		const comId = data.get('comId');
		const response = await createMinutes(comId, data);
		return response;
	}
);

export const detailMinutesById = createAsyncThunk(
	`${name}/DETAIL_MINUTES`,
	async data => {
		const { communityId, minutesId } = data;
		const response = await detailMinutes(communityId, minutesId);
		return response;
	}
);

export const deleteMinutesById = createAsyncThunk(
	`${name}/DELETE_MINUTES`,
	async data => {
		const { communityId, minutesId } = data;
		const res = await deleteMinutes(communityId, minutesId);
		fetchMinutesByComId(communityId);
		return res;
	}
);

export const updateMinutesByData = createAsyncThunk(
	`${name}/UPDATE_MINUTES`,
	async data => {
		const comId = data.get('comId');
		const minId = data.get('minId');
		const response = await updateMinutes(comId, minId, data);
		return response;
	}
);
const initialState = {
	allMinutes: [],
	singleMinutes: {
		createdAt: '',
		author: '',
		title: '',
		participants: [],
		speeches: [],
		deadline: '',
		Dday: '',
		content: '',
		referenceFile: undefined,
	},
};

const minutes = createSlice({
	name,
	initialState,
	reducers: {
		// standard reducer logic
	},
	extraReducers: {
		[fetchMinutesByComId.fulfilled]: (state, action) => {
			if (action.payload[0]) {
				state.allMinutes = action.payload;
			}
		},
		[detailMinutesById.fulfilled]: (state, action) => {
			const response = action.payload;
			// 기본 데이터 생성
			const writtenDate = response?.created_at;
			const author = response?.minute_participants.filter(
				member => member.is_assignee
			)[0]?.member?.nickname;
			const tmpParticipants = response?.minute_participants;
			const referenceFile = response?.minutefile_set;
			const speeches = response?.minute_speeches;
			const { title, deadline, content, conclusion } = response;
			// 작성일자 데이터 가공
			const createdAt = `${writtenDate.substr(2, 2)}.
			${writtenDate.substr(5, 2)}. ${writtenDate.substr(8, 2)}.
			${writtenDate.substr(11, 2)}시 ${writtenDate.substr(14, 2)}분`;
			// 참여자 데이터 가공
			const participants = tmpParticipants.map(user => user.member.nickname);
			// 종료일 데이터 가공
			const Dday = `${deadline.substr(2, 2)}.
			${deadline.substr(5, 2)}. ${deadline.substr(8, 2)}.
			${deadline.substr(11, 2)}시 ${deadline.substr(14, 2)}분`;
			// state 변경
			state.singleMinutes = {
				createdAt,
				conclusion,
				author,
				title,
				participants,
				speeches,
				deadline,
				Dday,
				content,
				referenceFile,
			};
		},
	},
});

export default minutes.reducer;
