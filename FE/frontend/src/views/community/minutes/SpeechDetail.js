import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
// styled-components
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ReactWordcloud from 'react-wordcloud';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import TextContent from '../../../components/common/TextContent';
import BtnBox from '../../../components/community/minutes/speech/BtnBox';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import RedMdBtn from '../../../components/common/RedMdBtn';
// api
import { deleteSpeechById, readSingleSpeechById } from '../../../store/speech';
// 워드 클라우드 디자인 제공 라이브러리
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const SpeechMain = styled(Main)`
	align-content: center;
	padding-top: 15px;
`;
const LeftContainer = styled(Container)`
	align-content: flex-start;
	background-color: ${props => props.theme.backgroundColor};
	width: 35%;
	padding: 0;
`;
const WordCloudContainer = styled(Container)`
	align-content: flex-start;
	height: 400px;
	width: 95%;
`;
const SpeechRecognitionContainer = styled(Container)`
	align-content: flex-start;
	margin: 15px 0;
	height: 460px;
	width: 95%;
`;
const RightContainer = styled(Container)`
	align-content: flex-start;
	background-color: ${props => props.theme.backgroundColor};
	margin-left: 20px;
	padding: 0;
	width: 50%;
`;
const SpeechInfoContainer = styled(Container)`
	align-content: flex-start;
	width: 95%;
`;
const TextContentBox = styled(TextContent)`
	margin: 7px;
	height: 300px;
	overflow: scroll;
`;
const SummaryBox = styled(TextContent)`
	margin: 7px;
	height: 120px;
	border: 1px solid;
	overflow: scroll;
`;

const SubmitBtn = styled(BlueMdBtn)`
	padding: 8px 20px;
	margin-right: 10px;
`;
const CanceltBtn = styled(RedMdBtn)`
	padding: 8px 20px;
	margin-right: 10px;
`;
const Br = styled.div`
	width: 100%;
	margin-top: 10px;
`;
const TextBox = styled(TextContent)`
	width: 100%;
`;
const TextUpload = styled(TextContent)`
	font-size: 16px;
`;
const Buttons = styled(BtnBox)`
	justify-content: end;
`;
const CreatePage = styled.form`
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;
	width: 100%;
`;
const AudioBox = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

function SpeechDetail() {
	// 초기 데이터 세팅
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(readSingleSpeechById(params));
	}, []);
	const { singleSpeech } = useSelector(state => state.speech);
	console.log('singleSpeech');
	console.log(singleSpeech);
	const {
		id,
		author,
		title,
		summary,
		wordCloudList,
		recordFile,
		voiceText,
		referenceFile,
		updatedAt,
	} = singleSpeech;
	// const audioSrc = `http://localhost:8000${recordFile}`;
	const audioSrc = 'http://localhost:8000/record/1648986351112.wav';
	// wordCloud
	const maxWords = 50;
	const options = {
		fontFamily: 'HoengseongHanu',
		rotations: 2,
		rotationAngles: [-90, 0],
		fontSizes: [15, 80],
		// fontWeight: 'bold, 400px, 700px',
		padding: 3,
	};
	const minSize = [100, 100];

	// 삭제
	const cancel = () => {
		dispatch(deleteSpeechById(params));
		Swal.fire({
			position: 'top-end',
			icon: 'success',
			title: '스피치가 삭제되었습니다.',
			showConfirmButton: false,
			timer: 1500,
		});
		navigate(`/community/${params.communityId}/minutes/${params.minutesId}`);
	};

	return (
		<CreatePage>
			<SpeechMain>
				<LeftContainer>
					<WordCloudContainer>
						<TextSubTitle>워드 클라우드</TextSubTitle>
						<DivLine />
						<Br />
						<div style={{ width: '100%', height: '280px' }}>
							<ReactWordcloud
								maxWords={maxWords}
								minSize={minSize}
								options={options}
								words={wordCloudList}
							/>
						</div>
					</WordCloudContainer>
					<SpeechRecognitionContainer>
						<TextSubTitle>스피치 전문</TextSubTitle>
						<DivLine />
						<TextContentBox>{voiceText}</TextContentBox>
						<AudioBox>
							<audio controls>
								<source src={audioSrc} type='audio/wav' />
								<track kind='captions' />
							</audio>
						</AudioBox>
					</SpeechRecognitionContainer>
				</LeftContainer>
				<RightContainer>
					<SpeechInfoContainer>
						<TextSubTitle>스피치 정보</TextSubTitle>
						<DivLine />
						<TextBox>
							최근 수정일: {dayjs(updatedAt).format('YYYY-MM-DD HH:MM')}
						</TextBox>
						<TextBox>작성자: {author}</TextBox>
						<TextBox>제목: {title}</TextBox>
						<TextBox>내용 요약</TextBox>
						<SummaryBox>{summary}</SummaryBox>
						<TextUpload>첨부 파일 </TextUpload>
						<Br style={{ margin: '20px' }} />
					</SpeechInfoContainer>
					<Buttons>
						<CanceltBtn onClick={cancel}>작성 취소</CanceltBtn>
						<SubmitBtn type='submit'>작성 완료</SubmitBtn>
					</Buttons>
				</RightContainer>
			</SpeechMain>
		</CreatePage>
	);
}

export default SpeechDetail;
