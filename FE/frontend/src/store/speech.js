import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteSpeech, updateSpeech, getSingleSpeech } from '../api/speech';

const name = 'speech';

export const readSingleSpeechById = createAsyncThunk(
	`${name}/READ_SPEECH`,
	async data => {
		const { communityId, minutesId, speechId } = data;
		const response = await getSingleSpeech(communityId, minutesId, speechId);
		return response;
	}
);
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
		const { communityId, minutesId, speechId } = data;
		const res = await deleteSpeech(communityId, minutesId, speechId);
		return res;
	}
);

const initialState = {
	singleSpeech: {
		id: undefined,
		author: '',
		title: '',
		summary: '',
		speechComments: [],
		referenceFile: [],
		wordCloudList: [],
		recordFile: '',
		voiceText: '',
		updatedAt: '',
		completed: false,
		loading: true,
	},
};

function polishData(data) {
	// 기본 데이터 입력받기
	const polished = {};
	if (data === 400) {
		return initialState;
	}
	// 기본 데이터 입력받기
	polished.id = data.id;
	polished.title = data.title;
	polished.summary = data.summary;
	polished.speechComments = data.speech_comments;
	polished.recordFile = data.record_file;
	polished.referenceFile = data.speechfile_set;
	polished.voiceText = data.voice_text;
	polished.updatedAt = data.updated_at;
	polished.author = data?.participant?.member?.nickname;
	polished.content = data.content;
	// 워드 클라우드 데이터 가공 WORD[{text: string, value: number,}]
	const text = data?.cloud_keyword.slice(1, -1);
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
	polished.wordCloudList = wordCloudList;
	return polished;
}

const speech = createSlice({
	name,
	initialState,
	reducers: {
		fetchSpeechByAI: (state, action) => {
			const { id, summary, wordCloudList, recordFile, voiceText } = polishData(
				action.payload
			);

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
		[readSingleSpeechById.fulfilled]: (state, action) => {
			state.singleSpeech = polishData(action.payload);
		},
	},
});

export const { fetchSpeechByAI, finishLoading } = speech.actions;

export default speech.reducer;
