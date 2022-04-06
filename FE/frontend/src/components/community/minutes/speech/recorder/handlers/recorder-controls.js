import { createSpeech } from '../../../../../../api/speech';

export async function startRecording(setRecorderState) {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		setRecorderState(prevState => ({
			...prevState,
			status: 'recording',
			initRecording: true,
			mediaStream: stream,
		}));
	} catch (err) {
		console.log(err);
	}
}

export function saveRecording(recorder) {
	if (recorder.state !== 'inactive') recorder.stop();
}

export function pauseRecording(recorder) {
	if (recorder.state !== 'paused') recorder.pause();
}

export function resumeRecording(recorder) {
	if (recorder.state !== 'recording') recorder.resume();
}

export async function uploadRecording(comId, minId, formData) {
	const res = await createSpeech(comId, minId, formData);
	return res;
}
