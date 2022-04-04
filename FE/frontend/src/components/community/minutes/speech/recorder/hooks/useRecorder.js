import { useState, useEffect } from 'react';
import {
	startRecording,
	saveRecording,
	pauseRecording,
	resumeRecording,
	uploadRecording,
} from '../handlers/recorder-controls';

const initialState = {
	initRecording: false,
	status: 'idle',
	mediaStream: null,
	mediaRecorder: null,
	recordFile: null,
	audio: null,
};

export default function useRecorder() {
	const [recorderState, setRecorderState] = useState(initialState);

	useEffect(() => {
		if (recorderState.mediaStream)
			setRecorderState(prevState => ({
				...prevState,
				mediaRecorder: new MediaRecorder(prevState.mediaStream),
			}));
	}, [recorderState.mediaStream]);

	useEffect(() => {
		const recorder = recorderState.mediaRecorder;
		let chunks = [];

		if (recorder && recorder.state === 'inactive') {
			recorder.start();

			recorder.ondataavailable = e => {
				chunks.push(e.data);
			};

			recorder.onstop = () => {
				const blob = new Blob(chunks, { type: 'audio/wav' });
				chunks = [];

				// 파일명 만들기
				const date = new Date().getTime();
				setRecorderState(prevState => {
					if (prevState.mediaRecorder)
						return {
							...initialState,
							status: 'stopped',
							recordFile: new File([blob], `${date}.wav`),
							audio: window.URL.createObjectURL(blob),
						};
					return initialState;
				});
			};
			recorder.onpause = () => {
				setRecorderState(prevState => ({
					...prevState,
					status: 'paused',
				}));
			};
			recorder.onresume = () => {
				setRecorderState(prevState => ({
					...prevState,
					status: 'recording',
				}));
			};
		}

		return () => {
			if (recorder)
				recorder.stream.getAudioTracks().forEach(track => track.stop());
		};
	}, [recorderState.mediaRecorder]);

	return {
		recorderState,
		startRecording: () => startRecording(setRecorderState),
		cancelRecording: () => setRecorderState(initialState),
		saveRecording: () => saveRecording(recorderState.mediaRecorder),
		pauseRecording: () => pauseRecording(recorderState.mediaRecorder),
		resumeRecording: () => resumeRecording(recorderState.mediaRecorder),
		uploadRecording: async (comId, minId) => {
			const FD = new FormData();
			FD.append('enctype', 'multipart/form-data');
			FD.append('title', 'title');
			FD.append('record_file', recorderState.recordFile);
			const res = await uploadRecording(comId, minId, FD);
			return res;
		},
	};
}
