import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
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
	const { recorderState, ...handlers } = Recorder();

	const speechFinished = formData => {
		console.log('formData', formData);
		createSpeech(communityId, minutesId, formData);
		// navigate(
		// 	`${routes.community}/${communityId}/minutes/${minutesId}/speechCreate`,
		// 	{ media }
		// );
	};
	// if (mediaBlobUrl) {
	// 	const fileName = `${new Date().toString()}.wav`;
	// 	const recordFile = new File([mediaBlobUrl], fileName);
	// 	console.log('recordFile', recordFile);
	// 	const formData = new FormData();
	// 	formData.append('record_file', recordFile);
	// 	formData.append('enctype', 'multipart/form-data');
	// 	formData.append('title', 'title');
	// 	const res = speechFinished(formData);
	// 	console.log('res', res);
	// }
	const [recordStatus, setRecordStatus] = useState('idle');

	return (
		<Main>
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
					<audio controls src=''>
						<track kind='captions' />
					</audio>
					<StartBtn status={recordStatus}>스피치 시작</StartBtn>
					<PauseBtn status={recordStatus}>일시 정지</PauseBtn>
					<ResumeBtn status={recordStatus}>다시 시작</ResumeBtn>
					<StopBtn status={recordStatus}>스피치 종료</StopBtn>
				</BtnBox>
			</RecContainer>
		</Main>
	);
}

export default Records;
