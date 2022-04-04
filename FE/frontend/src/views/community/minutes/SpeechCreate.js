import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ReactWordcloud from 'react-wordcloud';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import Loading from '../../../components/community/minutes/speech/Loading';
import LoadingComplete from '../../../components/community/minutes/speech/LoadingComplete';
import AreaLabel from '../../../components/auth/AreaLabel';
import Label from '../../../components/auth/Label';
import TextContent from '../../../components/common/TextContent';
import LabelFile from '../../../components/community/minutes/create/LabelFile';
import InputFile from '../../../components/community/minutes/create/InputFile';
import BtnBox from '../../../components/community/minutes/speech/BtnBox';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
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
	height: 350px;
	width: 95%;
`;
const SpeechRecognitionContainer = styled(Container)`
	align-content: flex-start;
	margin-top: 15px;
	height: 50%;
	width: 95%;
`;
const SpeechInfoContainer = styled(Container)`
	align-content: flex-start;
	margin-left: 20px;
	margin-bottom: 20px;
	width: 50%;
`;

// Form 관련
const TextLabel = styled(AreaLabel)`
	margin-left: 10px;
	width: 90%;
	textarea {
		margin: 15px 0 15px 5px;
		border-radius: 5px;
		font-size: 20px;
	}
`;
const ErrorMsg = styled.div`
	padding-top: 5px;
	width: 670px;
	text-align: end;
	font-size: 15px;
	color: ${props => props.theme.warnColor};
`;
const TextBox = styled(TextSubTitle)`
	display: inline-flex;
	align-items: center;
	padding: 10px;
`;
const InputLabel = styled(Label)`
	width: 75%;

	input {
		font-size: 20px;
		width: 100%;
	}
`;
const SubmitBtn = styled(BlueMdBtn)`
	padding: 8px 20px;
	margin-right: 10px;
`;
const Br = styled.div`
	width: 100%;
	margin-top: 10px;
`;
const TextUpload = styled(TextContent)`
	font-size: 16px;
`;
const Buttons = styled(BtnBox)`
	justify-content: end;
`;

// 보여줄 컴포넌트 선택 로딩-완료-수정
const LoadingPage = styled(Main)`
	display: ${props => (props.status === 'loading' ? 'flex' : 'none')};
`;
const CompletePage = styled(Main)`
	display: ${props => (props.status === 'completed' ? 'flex' : 'none')};
`;
const CreatePage = styled.form`
	display: ${props => (props.status === 'create' ? 'block' : 'none')};
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;
	margin-top: 110px;
	height: 100%;
	width: 100%;
`;

function SpeechCreate() {
	// 페이지 전환 로직 로딩-완료-수정
	const [status, setStatus] = useState('loading');
	const { createdSpeech } = useSelector(state => state.speech);
	const {
		id,
		summary,
		wordCloudList,
		completed,
		loading,
		recordFile,
		voiceText,
	} = createdSpeech;
	// const audioSrc = `http://localhost:8000${recordFile}`;
	const audioSrc = 'http://localhost:8000/record/1648986351112.wav';
	useEffect(() => {
		if (!completed && loading) {
			setStatus('loading');
		} else if (completed && loading) {
			setStatus('completed');
		} else if (completed && !loading) {
			setStatus('create');
		}
	}, [completed, loading]);

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

	// React-hook-form
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			content: '',
			title: '',
			summary,
			voiceText,
			upload: [],
		},
	});
	useEffect(() => {
		if (createdSpeech) {
			setValue('voiceText', voiceText);
			setValue('summary', summary);
		}
	}, [createdSpeech]);
	const { communityId, minutesId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	function onValidSubmit(data) {
		console.log(data);
	}

	// 업로드 된 파일 표시하기 위한 변수
	const uploadedFiles = watch('upload');
	const fileList = uploadedFiles ? Object.values(uploadedFiles) : [];
	const fileCount = fileList?.length;
	return (
		<>
			{/* 로딩 페이지 */}
			<LoadingPage status={status}>
				<Loading />
			</LoadingPage>
			{/* 완료 페이지 */}
			<CompletePage status={status}>
				<LoadingComplete />
			</CompletePage>
			{/* 스피치 작성 페이지 */}
			<CreatePage status={status} onSubmit={handleSubmit(onValidSubmit)}>
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
							<TextLabel htmlFor='voiceText'>
								<textarea
									style={{ height: '100%' }}
									{...register('voiceText', {
										required: '내용을 입력해주세요.',
									})}
									cols='10'
									rows='10'
									placeholder='내용 없음'
								/>
							</TextLabel>
							<ErrorMsg>{errors?.voiceText?.message}</ErrorMsg>
						</SpeechRecognitionContainer>
					</LeftContainer>
					<SpeechInfoContainer>
						<TextSubTitle>스피치 정보</TextSubTitle>
						<DivLine />
						<TextBox>제목 :</TextBox>
						<InputLabel htmlFor='title'>
							<input
								{...register('title', {
									required: '제목을 입력해주세요.',
									maxLength: { value: 255, message: '255자 이내로 입력해주세요.' },
								})}
								type='title'
								placeholder='제목 없음'
							/>
						</InputLabel>
						<ErrorMsg>{errors?.title?.message}</ErrorMsg>
						<Br />
						<TextBox>한줄 요약</TextBox>
						<TextLabel htmlFor='summary'>
							<textarea
								style={{ height: '50px' }}
								{...register('summary', {
									required: '내용을 입력해주세요.',
								})}
								cols='10'
								rows='10'
								placeholder='내용 없음'
							/>
						</TextLabel>
						<ErrorMsg>{errors?.summary?.message}</ErrorMsg>
						<Br />
						<TextBox>내용 정리</TextBox>
						<TextLabel htmlFor='content'>
							<textarea
								style={{ height: '200px' }}
								{...register('content', {
									required: '내용을 입력해주세요.',
								})}
								cols='10'
								rows='10'
								placeholder='내용 없음'
							/>
						</TextLabel>
						<ErrorMsg>{errors?.content?.message}</ErrorMsg>
						<Br />
						<TextBox>다시 듣기 :</TextBox>
						<audio controls>
							<source src={audioSrc} type='audio/wav' />
							<track kind='captions' />
						</audio>
						<Br />
						<Br />
						<TextUpload>파일 첨부 : </TextUpload>
						<LabelFile htmlFor='file'>업로드</LabelFile>
						<InputFile
							{...register('upload')}
							id='file'
							type='file'
							multiple
							accept='.ppt, .pptx, .docs, .pdf, .word, .hwp, .png'
						/>
						<TextUpload>{fileCount}개의 파일 업로드</TextUpload>
						<Br style={{ margin: '20px' }} />
						<Buttons>
							<SubmitBtn type='submit'>제출</SubmitBtn>
						</Buttons>
					</SpeechInfoContainer>
				</SpeechMain>
			</CreatePage>
		</>
	);
}

export default SpeechCreate;
