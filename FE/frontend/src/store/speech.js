import { createSlice } from '@reduxjs/toolkit';
// import { createSpeech } from '../api/speech';

const name = 'speech';

const speech = createSlice({
	name,
	initialState: {
		createdSpeech: {
			id: undefined,
			summary: '',
			wordCloudList: [],
			recordFile: '',
			voiceText: '',
			completed: false,
			loading: true,
		},
	},
	reducers: {
		fetchSpeechByAI: (state, action) => {
			const { id, summary } = action.payload;
			// 워드 클라우드 데이터 가공 WORD[{text: string, value: number,}]
			const cloudKeyword = action.payload.cloud_keyword;
			const recordFile = action.payload.record_file;
			const voiceText = action.payload.voice_text;
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

			state.createdSpeech = {
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
			state.createdSpeech.loading = false;
		},
	},
	extraReducers: {},
});

export const { fetchSpeechByAI, finishLoading } = speech.actions;

export default speech.reducer;
