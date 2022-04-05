import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteSpeech, updateSpeech } from '../api/speech';
// import { createSpeech } from '../api/speech';

const name = 'speech';

export const updateSpeechByData = createAsyncThunk(
	`${name}/UPDATE_SPEECH`,
	async data => {
		const comId = data.get('comId');
		const minId = data.get('minId');
		const spcId = data.get('spcId');
		const res = await updateSpeech(comId, minId, spcId, data);
		return res;
	}
);
export const deleteSpeechById = createAsyncThunk(
	`${name}/CLEAR_SPEECH`,
	async data => {
		console.log('data', data);
		const { communityId, minutesId, speechId } = data;
		const res = await deleteSpeech(communityId, minutesId, speechId);
		return res;
	}
);

const initialState = {
	singleSpeech: {
		id: undefined,
		summary: '',
		wordCloudList: [],
		recordFile: '',
		voiceText: '',
		completed: false,
		loading: true,
	},
};

const speech = createSlice({
	name,
	initialState,
	reducers: {
		fetchSpeechByAI: (state, action) => {
			// 기본 데이터 입력받기
			const { id, summary } = action.payload;
			const recordFile = action.payload.record_file;
			const voiceText = action.payload.voice_text;
			// 워드 클라우드 데이터 가공 WORD[{text: string, value: number,}]
			const cloudKeyword = action.payload.cloud_keyword;
			const text = cloudKeyword.slice(1, -1);
			const arr = text.split(', ');
			const result = arr.map(word => word.slice(1, -1));
			const countWords = {};
			result.forEach(word => {
				if (countWords[word]) {
					countWords[word] += 1;
				} else {
					countWords[word] = 1;
				}
			});
			const wordCloudList = [];
			const keyWords = Object.keys(countWords);
			keyWords.forEach(word => {
				wordCloudList.push({
					text: word,
					value: countWords[word],
				});
			});

			state.singleSpeech = {
				id,
				summary,
				wordCloudList,
				recordFile,
				voiceText,
				completed: true,
				loading: true,
			};
		},
		finishLoading: state => {
			state.singleSpeech.loading = false;
		},
	},
	extraReducers: {
		[deleteSpeechById.fulfilled]: state => Object.assign(state, initialState),
		[updateSpeechByData.fulfilled]: state => Object.assign(state, initialState),
	},
});

export const { fetchSpeechByAI, finishLoading } = speech.actions;

export default speech.reducer;
