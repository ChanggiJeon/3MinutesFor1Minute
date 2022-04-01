import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactMediaRecorder } from 'react-media-recorder';
import Main from '../../../components/community/MainCenter';
import GrayLgButton from '../../../components/common/GrayLgButton';
import RecorderImg from '../../../components/community/minutes/speech/RecorderImg';
import RecordsWave from '../../../components/community/minutes/speech/RecordsWave';
import recorder from '../../../assets/recorder.png';
import Container from '../../../components/community/Container';
import MainBox from '../../../components/community/minutes/speech/MainBox';
import BtnBox from '../../../components/community/minutes/speech/BtnBox';
import SubBox from '../../../components/community/minutes/speech/SubBox';
import Timer from '../../../components/community/minutes/speech/Timer';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import routes from '../../../routes';
import createSpeech from '../../../api/speech';

const StartBtn = styled(GrayLgButton)`
	${props => props.status === 'idle' && `display: inline-block;`}
`;
const PauseBtn = styled(GrayLgButton)`
	${props => props.status === 'recording' && `display: inline-block;`}
`;
const ResumeBtn = styled(GrayLgButton)`
	${props => props.status === 'paused' && `display: inline-block;`}
`;
const StopBtn = styled(GrayLgButton)`
	${props => props.status === 'recording' && `display: inline-block;`}
`;
const RecContainer = styled(Container)`
	align-content: space-between;
	width: 900px;
	height: 500px;
`;

function Records() {
	const navigate = useNavigate();
	const { communityId, minutesId } = useParams();
	// media recorder 세팅
	const {
		// status : idle-정지 / acquiring_media-마이크권한 요청 / recording-녹음중 / stopped-정지 / paused-일시정지 /
		status,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		clearBlobUrl,
		audio,
		// mediaBlobUrl : 녹음된 파일이 저장된 URL 반환
		mediaBlobUrl,
	} = useReactMediaRecorder({
		video: false,
		audio: true,
		blobPropertyBag: {
			type: 'audio/wav',
		},
	});
	console.log('mediaBlobUrl', mediaBlobUrl);

	const speechFinished = formData => {
		console.log('formData', formData);
		createSpeech(communityId, minutesId, formData);
		// navigate(
		// 	`${routes.community}/${communityId}/minutes/${minutesId}/speechCreate`,
		// 	{ media }
		// );
	};
	if (mediaBlobUrl) {
		const fileName = `${new Date().toString()}.wav`;
		const recordFile = new File([mediaBlobUrl], fileName);
		console.log('recordFile', recordFile);
		const formData = new FormData();
		formData.append('record_file', recordFile);
		formData.append('enctype', 'multipart/form-data');
		formData.append('title', 'title');
		const res = speechFinished(formData);
		console.log('res', res);
	}

	return (
		<Main>
			<RecContainer>
				<TextSubTitle>스피치 생성(녹음)</TextSubTitle>
				<DivLine />
				<MainBox>
					<SubBox>
						<RecordsWave status={status} />
						<RecorderImg src={recorder} />
					</SubBox>
					<SubBox>
						<Timer status={status} />
					</SubBox>
				</MainBox>
				<BtnBox>
					<audio controls src={mediaBlobUrl}>
						<track kind='captions' />
					</audio>
					<StartBtn status={status} onClick={startRecording}>
						스피치 시작
					</StartBtn>
					<PauseBtn status={status} onClick={pauseRecording}>
						일시 정지
					</PauseBtn>
					<ResumeBtn status={status} onClick={resumeRecording}>
						다시 시작
					</ResumeBtn>
					<StopBtn status={status} onClick={stopRecording}>
						스피치 종료
					</StopBtn>
				</BtnBox>
			</RecContainer>
		</Main>
	);
}

export default Records;
