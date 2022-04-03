import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import GrayLgButton from '../../../../common/GrayLgButton';
import RecorderImg from '../RecorderImg';
import RecordsWave from '../RecordsWave';
import recorder from '../../../../../assets/recorder.png';
import Container from '../../../Container';
import MainBox from '../MainBox';
import BtnBox from '../BtnBox';
import SubBox from '../SubBox';
import Timer from '../Timer';
import TextSubTitle from '../../../../common/TextSubTitle';
import DivLine from '../../../main/DivLine';
import RecordPlayer from './RecordPlayer';
import useRecorder from './hooks/useRecorder';

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
const UploadBtn = styled(GrayLgButton)`
	${props => props.status === 'stopped' && `display: inline-block;`}
`;
const CancelBtn = styled(GrayLgButton)`
	${props => props.status === 'stopped' && `display: inline-block;`}
`;
const RecContainer = styled(Container)`
	align-content: space-between;
	width: 900px;
	height: 500px;
`;

// 레코드 기능 UI (기능 관련 내용은 @/components/community/minutes/speech/recorder의 handlers와 hooks 참조)
function Recorder() {
	const navigate = useNavigate();
	const { communityId, minutesId } = useParams();
	const [recordStatus, setRecordStatus] = useState('idle');
	const { recorderState, ...handlers } = useRecorder();
	const { status, audio } = recorderState;
	const {
		startRecording,
		saveRecording,
		cancelRecording,
		pauseRecording,
		resumeRecording,
		uploadRecording,
	} = handlers;
	// 레코딩 상태 변화 관리
	useEffect(() => {
		switch (status) {
			case 'recording':
				setRecordStatus('recording');
				break;
			case 'paused':
				setRecordStatus('paused');
				break;
			case 'stopped':
				setRecordStatus('stopped');
				break;
			default:
				setRecordStatus('idle');
		}
	}, [status]);
	const upload = () => {
		navigate(`/community/${communityId}/minutes/${minutesId}/loading`);
		uploadRecording(communityId, minutesId);
	};

	return (
		<RecContainer>
			<TextSubTitle>스피치 생성(녹음)</TextSubTitle>
			<DivLine />
			<MainBox>
				<SubBox>
					<RecordsWave status={recordStatus} />
					<RecorderImg src={recorder} />
				</SubBox>
				<SubBox>
					<Timer status={recordStatus} />
				</SubBox>
			</MainBox>
			<BtnBox>
				<RecordPlayer audioURL={audio} />
				<StartBtn status={recordStatus} onClick={startRecording}>
					스피치 시작
				</StartBtn>
				<PauseBtn status={recordStatus} onClick={pauseRecording}>
					일시 정지
				</PauseBtn>
				<ResumeBtn status={recordStatus} onClick={resumeRecording}>
					다시 시작
				</ResumeBtn>
				<StopBtn status={recordStatus} onClick={saveRecording}>
					스피치 종료
				</StopBtn>
				<CancelBtn status={recordStatus} onClick={cancelRecording}>
					작성 취소
				</CancelBtn>
				<UploadBtn status={recordStatus} onClick={upload}>
					스피치 작성
				</UploadBtn>
			</BtnBox>
		</RecContainer>
	);
}

export default Recorder;
