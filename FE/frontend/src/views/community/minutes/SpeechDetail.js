import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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
import GrayMdBtn from '../../../components/common/GrayMdBtn';
import HeaderBox from '../../../components/community/HeaderBox';
import SpeechComment from './SpeechComments';
import NForm from '../../../components/community/board/list/NForm';
import Label from '../../../components/auth/Label';
import SubmitButton from '../../../components/auth/SubmitButton';

// api
import { deleteSpeechById, readSingleSpeechById } from '../../../store/speech';
import {
	apiDeleteComment,
	apiPutComment,
	downloadFile as download,
} from '../../../api/speech';
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
	margin: 15px 0;
	height: 460px;
	width: 95%;
`;
const RightContainer = styled(Container)`
	align-content: flex-start;
	background-color: ${props => props.theme.backgroundColor};
	margin-left: 20px;
	padding: 0;
	width: 55%;
`;
const CommentContainer = styled(Container)`
	display: flex;
	justify-content: center;
	align-content: flex-start;
	width: 95%;
	margin: 15px 0px;
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
	width: 100%;
	overflow: scroll;
`;

const UpdateBtn = styled(BlueMdBtn)`
	padding: 8px 20px;
	margin-right: 10px;
`;
const DeleteBtn = styled(RedMdBtn)`
	padding: 8px 20px;
	margin-right: 10px;
`;
const BackSpaceBtn = styled(GrayMdBtn)`
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
const Buttons = styled(BtnBox)`
	justify-content: end;
	width: 60%;
`;
const EditBtns = styled.div`
	display: ${props => (props.isAuthor ? 'flex' : 'none')};
`;
const CreatePage = styled.div`
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
const CommentList = styled.div`
	display: flex;
	justify-content: space-between;
	width: 90%;
	align-items: center;
	margin-top 3px;
`;
const CommentBtn = styled.div`
	display: flex;
	flex-direction: row;
`;

const SmallBtn = styled(SubmitButton)`
	display: inline-block;
	width: 40%;
	margin: 5px;
	padding: 0px;
	font-size: 15px;
`;

const CommentName = styled.div``;

const CForm = styled(NForm)`
	padding: 0px;
`;
const CLabel = styled(Label)`
	input {
		width: 100%;
		font-size: 15px;
	}
`;
const FileItem = styled(TextContent)`
	cursor: pointer;
`;

function SpeechDetail() {
	// 초기 데이터 세팅
	const [isAuthor, setIsAuthor] = useState(false);
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(readSingleSpeechById(params));
	}, []);
	const loginUser = useSelector(state => state.member.nickname);
	const { singleSpeech } = useSelector(state => state.speech);
	const {
		author,
		title,
		summary,
		content,
		speechComments,
		wordCloudList,
		recordFile,
		voiceText,
		referenceFile,
		updatedAt,
	} = singleSpeech;
	const audioSrc = `${process.env.REACT_APP_MEDIA_URL}/${recordFile}`;
	// 데이터 받으면 작성자인지 확인
	useEffect(() => {
		if (loginUser === author) {
			setIsAuthor(true);
		}
	}, [singleSpeech]);
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
	// 수정페이지 이동
	const updateSpeech = () => {
		navigate(
			`/community/${params.communityId}/minutes/${params.minutesId}/speech/${params.speechId}/update`
		);
	};

	// 삭제
	const deleteSpeech = async () => {
		await Swal.fire({
			title: '삭제하시겠습니까?',
			text: '해당 스피치와 관련된 모든 데이터가 사라집니다.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#537791',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then(result => {
			if (result.isConfirmed) {
				try {
					dispatch(deleteSpeechById(params));
					Swal.fire('완료', '스피치가 삭제되었습니다.', 'success');
					navigate(`/community/${params.communityId}/minutes/${params.minutesId}`);
				} catch {
					Swal.fire('실패', '에러 발생, 관리자에게 문의바랍니다.', 'error');
				}
			}
		});
	};

	// comment관련
	const [targetComment, setTargetComment] = useState({});
	const [isCommentUpdating, setCommentUpdating] = useState(false);
	const { nickname } = useSelector(state => state.member);
	const { communityId, minutesId, speechId } = useParams();
	const {
		register: cRegister,
		handleSubmit: cHandleSubmit,
		getValues: cGetValues,
		setValue: cSetValue,
	} = useForm({
		mode: 'all',
	});

	const onValidSubmitComment = async () => {
		const { content } = cGetValues();
		try {
			await apiPutComment({
				communityId,
				minutesId,
				speechId,
				commentId: targetComment.id,
				content,
			});
			await Swal.fire({
				icon: 'success',
				text: '수정을 완료하였습니다.',
			});
			window.location.reload(true);
			setCommentUpdating(false);
		} catch (e) {
			// error
			await Swal.fire({
				icon: 'error',
				text: '수정을 실패하였습니다.',
			});
		}
	};
	const handleDeleteComment = async commentId => {
		await Swal.fire({
			title: '정말 삭제하시겠습니까?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#dd3333',
			cancelButtonText: '취소',
			confirmButtonText: '삭제',
		}).then(result => {
			if (result.isConfirmed) {
				deleteComment(commentId);
			}
		});
	};
	const deleteComment = async commentId => {
		try {
			await apiDeleteComment({ communityId, minutesId, speechId, commentId });
			await Swal.fire({
				icon: 'success',
				text: '댓글이 삭제되었습니다.',
			});
			window.location.reload(true);
		} catch (e) {
			// error
			await Swal.fire({
				icon: 'error',
				text: '삭제 실패, 새로 고침 후, 다시 시도하세요.',
			});
		}
	};
	// 첨부파일 다운로드
	const downloadFile = ({ fileId, fileName }) => {
		const res = download(
			params.communityId,
			params.minutesId,
			params.speechId,
			fileId
		);
		res.then(blob => {
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${fileName}`);
			document.body.appendChild(link);
			link.click();
		});
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
							{recordFile ? (
								<audio controls>
									<source src={audioSrc} type='audio/wav' />
									<track kind='captions' />
								</audio>
							) : null}
						</AudioBox>
					</SpeechRecognitionContainer>
				</LeftContainer>
				<RightContainer>
					<SpeechInfoContainer>
						<HeaderBox>
							<TextSubTitle>스피치 정보</TextSubTitle>
							<Buttons>
								<EditBtns isAuthor={isAuthor}>
									<UpdateBtn onClick={updateSpeech}>수정</UpdateBtn>
									<DeleteBtn onClick={deleteSpeech}>삭제</DeleteBtn>
								</EditBtns>
								<BackSpaceBtn
									onClick={() => {
										navigate(
											`/community/${params.communityId}/minutes/${params.minutesId}`
										);
									}}
								>
									돌아가기
								</BackSpaceBtn>
							</Buttons>
						</HeaderBox>
						<DivLine />
						<TextBox>
							최근 수정일: {dayjs(updatedAt).format('YYYY-MM-DD HH:MM')}
						</TextBox>
						<TextBox>작성자: {author}</TextBox>
						<TextBox>제목: {title}</TextBox>
						<TextBox>한줄 요약</TextBox>
						<SummaryBox>{summary}</SummaryBox>
						<TextBox>내용</TextBox>
						<SummaryBox>{content}</SummaryBox>
						<TextContent>첨부 파일</TextContent>
						{referenceFile[0] ? (
							referenceFile.map(file => (
								<FileItem
									key={file.id}
									onClick={() =>
										downloadFile({ fileId: file.id, fileName: file.filename })
									}
								>
									{file.filename}
								</FileItem>
							))
						) : (
							<TextContent>첨부파일 없음</TextContent>
						)}
						<Br style={{ margin: '20px' }} />
					</SpeechInfoContainer>
					<CommentContainer>
						<SpeechComment />
						{speechComments.map(comment => (
							<CommentList key={comment.id}>
								{/* 댓글 update true */}
								{isCommentUpdating && comment === targetComment ? (
									<CForm onSubmit={cHandleSubmit(onValidSubmitComment)}>
										<CLabel htmlFor='content'>
											<input
												{...cRegister('content', {
													required: true,
												})}
												type='content'
												placeholder='내용 없음'
											/>
											<SmallBtn type='submit'>수정</SmallBtn>
											<SmallBtn
												type='button'
												onClick={() => {
													setCommentUpdating(false);
													setTargetComment({});
												}}
											>
												취소
											</SmallBtn>
										</CLabel>
									</CForm>
								) : (
									// 댓글 update false
									<>
										<CommentName>
											{comment?.member?.nickname} - {comment?.content}
										</CommentName>
										{/* 로그인 유저 === 댓글 작성자 일때 버튼이 보여야 함 */}
										{comment?.member?.nickname === nickname ? (
											<CommentBtn>
												<SmallBtn
													type='button'
													onClick={() => {
														setCommentUpdating(true);
														setTargetComment(comment);
														cSetValue('content', comment.content);
													}}
												>
													수정
												</SmallBtn>
												<SmallBtn
													type='button'
													onClick={() => handleDeleteComment(comment.id)}
												>
													삭제
												</SmallBtn>
											</CommentBtn>
										) : null}
									</>
								)}
							</CommentList>
						))}
					</CommentContainer>
				</RightContainer>
			</SpeechMain>
		</CreatePage>
	);
}

export default SpeechDetail;
