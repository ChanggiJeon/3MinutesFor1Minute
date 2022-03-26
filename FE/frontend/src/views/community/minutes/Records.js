import styled from 'styled-components'
import { useReactMediaRecorder } from 'react-media-recorder';
import Main from '../../../components/community/minutes/RecordsBg';
import GrayLgButton from '../../../components/common/GrayLgButton';
import RecorderImg from '../../../components/community/minutes/RecorderImg';
import RecordsWave from '../../../components/community/minutes/RecordsWave';
import recorder from '../../../assets/recorder.png';
import Container from '../../../components/community/minutes/Container';
import MainBox from '../../../components/community/minutes/MainBox';
import BtnBox from '../../../components/community/minutes/BtnBox';
import SubBox from '../../../components/community/minutes/SubBox';
import Timer from '../../../components/community/minutes/Timer';

const StartBtn = styled(GrayLgButton)`
	${props => props.status === 'idle' && `display: inline-block;`}
`
const PauseBtn = styled(GrayLgButton)`
	${props => props.status === 'recording' && `display: inline-block;`}
`
const ResumeBtn = styled(GrayLgButton)`
	${props => props.status === 'paused' && `display: inline-block;`}
`
const StopBtn = styled(GrayLgButton)`
	${props => props.status === 'recording' && `display: inline-block;`}
`

function Records() {
	const {
		// status : idle-정지 / acquiring_media-마이크권한 요청 / recording-녹음중 / stopped-정지 / paused-일시정지 /
		status,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		clearBlobUrl,
		// mediaBlobUrl : 녹음된 파일이 저장된 URL 반환
		mediaBlobUrl,
	} = useReactMediaRecorder({
		audio: true,
	});

	return (
		<Main>
			<Container>
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
					<StartBtn status={status} onClick={startRecording}>스피치 시작</StartBtn>
					<PauseBtn status={status} onClick={pauseRecording}>일시 정지</PauseBtn>
					<ResumeBtn status={status} onClick={resumeRecording}>다시 시작</ResumeBtn>
					<StopBtn status={status} onClick={stopRecording}>스피치 종료</StopBtn>
				</BtnBox>
			</Container>
		</Main>
	);
}

export default Records;
