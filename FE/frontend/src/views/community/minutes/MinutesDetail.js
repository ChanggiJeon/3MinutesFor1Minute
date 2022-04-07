import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	detailMinutesById,
	deleteMinutesById,
	endMinutesById,
} from '../../../store/minutes';
import { deleteSpeechById } from '../../../store/speech';
import { downloadFile as download } from '../../../api/minutes';
import routes from '../../../routes';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainStart';
import TextSubTitle from '../../../components/common/TextSubTitle';
import TextContent from '../../../components/common/TextContent';
import DivLine from '../../../components/community/main/DivLine';
import ContentBox from '../../../components/common/ContentBox';
import HeaderBox from '../../../components/community/HeaderBox';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import RedMdBtn from '../../../components/common/RedMdBtn';
import BtnBox from '../../../components/community/BtnBox';
import SpeechItem from '../../../components/community/minutes/speech/SpeechItem';

const ContentsContainer = styled(Container)`
	flex-direction: column;
	border-radius: 15px;
	margin-top: 15px;
	width: 50%;
	overflow-y: scroll;
`;
const SpeechContainer = styled(Container)`
	flex-direction: column;
	align-content: flex-start;
	border-radius: 15px;
	margin-top: 15px;
	width: 40%;
`;
const EndMinutesBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;
const TopBtnBox = styled(BtnBox)`
	display: ${props => (props.isAuthor ? 'flex' : 'none')};
	width: 60%;
`;
const UpdateBtn = styled(BlueMdBtn)`
	margin-right: 10px;
`;
const DeleteBtn = styled(RedMdBtn)`
	margin-right: 10px;
`;
const EndBtn = styled(RedMdBtn)`
	display: ${props => (props.isAuthor ? 'block' : 'none')};
	margin-right: 10px;
`;
const SpeechBox = styled.div`
	display: flex;
	flex-direction: column;
	height: 200px;
	overflow-y: scroll;
`;
const SpeechCreateBtn = styled(BlueMdBtn)`
	display: ${props => (props.iCanSpeak === 'yes' ? 'block' : 'none')};
	margin-right: 10px;
`;
const SpeechDeleteBtn = styled(RedMdBtn)`
	display: ${props => (props.iCanSpeak === 'done' ? 'block' : 'none')};
	margin-right: 10px;
`;
const FileItem = styled(TextContent)`
	cursor: pointer;
`;

function MinutesDetail() {
	const [isAuthor, setIsAuthor] = useState(false);
	const [isParticipant, setIsParticipant] = useState(false);
	const [iCanSpeak, setICanSpeak] = useState('no');
	const [isDeleted, setIsDeleted] = useState(undefined);
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	// 리덕스 스토어 생성
	useEffect(() => {
		dispatch(detailMinutesById(params));
	}, [location]);
	// 백그라운드 데이터 설정
	const loginUser = useSelector(state => state.member.nickname);
	const singleMinutes = useSelector(state => state.minutes.singleMinutes);
	const { speeches, referenceFile } = singleMinutes;
	// 데이터 받아오면 초기값 설정
	useEffect(() => {
		if (loginUser === singleMinutes.author) {
			setIsAuthor(true);
		} else if (singleMinutes.participants.find(p => p === loginUser)) {
			setIsParticipant(true);
		} else {
			setIsAuthor(false);
			setIsParticipant(false);
		}
	}, [loginUser, singleMinutes]);
	// 스피치 등록/삭제 버튼 관련
	useEffect(() => {
		let check = 'I can make speech';
		singleMinutes.speeches.forEach(speech => {
			if (speech.participant.member.nickname === loginUser) {
				check = 'I can not make speech';
			}
		});
		if (check === 'I can not make speech') {
			setICanSpeak('done');
		} else if (isAuthor || isParticipant) {
			setICanSpeak('yes');
		} else {
			setICanSpeak('no');
		}
	}, [isAuthor, isParticipant, singleMinutes]);
	// 회의록 삭제
	const deleteMinutes = () => {
		Swal.fire({
			title: '삭제하시겠습니까?',
			text: '본 회의록과 관련된 모든 데이터가 사라집니다.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire('완료', '회의록이 삭제되었습니다.', 'success');
				setIsDeleted('deleted');
			}
		});
	};
	useEffect(async () => {
		if (isDeleted) {
			await dispatch(deleteMinutesById(params));
			navigate(`/community/${params.communityId}/minutes/`);
		}
	}, [isDeleted]);

	// 회의록 종료
	const endMinutes = async () => {
		const { value: text } = await Swal.fire({
			input: 'textarea',
			inputLabel: '회의 결과 입력',
			inputPlaceholder: '회의 결과를 입력해주세요.',
			inputAttributes: {
				'aria-label': '회의 결과를 입력해주세요.',
			},
			showCancelButton: true,
			confirmButtonText: '회의 종료',
			confirmButtonColor: '#537791',
			cancelButtonText: '취소',
		});

		if (text) {
			Swal.fire({
				title: '회의를 마치시겠습니까?',
				text: '더 이상의 스피치 등록이 불가능해집니다.',
				showDenyButton: true,
				confirmButtonText: '회의 종료',
				confirmButtonColor: '#537791',
				denyButtonText: `취소`,
			}).then(result => {
				if (result.isConfirmed) {
					const data = {
						communityId: params.communityId,
						minutesId: params.minutesId,
						conclusion: text,
						is_closed: true,
					};
					dispatch(endMinutesById(data));
					window.location.reload();
					Swal.fire('회의가 종료되었습니다.', '', 'success');
				} else if (result.isDenied) {
					Swal.fire('취소되었습니다.', '', 'info');
				}
			});
		}
	};
	// 스피치 삭제
	const deleteMySpeech = async () => {
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
					const request = {
						communityId: params.communityId,
						minutesId: params.minutesId,
					};
					singleMinutes.speeches.forEach(speech => {
						if (speech.participant.member.nickname === loginUser) {
							request.speechId = speech.id;
							dispatch(deleteSpeechById(request));
							Swal.fire('완료', '스피치가 삭제되었습니다.', 'success');
							window.location.reload();
						}
					});
				} catch {
					Swal.fire('실패', '에러 발생, 관리자에게 문의바랍니다.', 'error');
				}
			}
		});
	};
	// 첨부파일 다운로드
	const downloadFile = ({ fileId, fileName }) => {
		const res = download(params.communityId, params.minutesId, fileId);
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
		<Main>
			<ContentsContainer>
				<HeaderBox>
					<TextSubTitle>회의 내용</TextSubTitle>
					<TopBtnBox isAuthor={isAuthor}>
						<UpdateBtn
							onClick={() =>
								navigate(
									`${routes.community}/${params.communityId}/minutes/${params.minutesId}/update`
								)
							}
						>
							수정
						</UpdateBtn>
						<DeleteBtn onClick={deleteMinutes}>삭제</DeleteBtn>
					</TopBtnBox>
				</HeaderBox>
				<DivLine />
				<TextContent>작성 일자 : {singleMinutes.createdAt}</TextContent>
				<TextContent>작성자 : {singleMinutes.author}</TextContent>
				<TextContent>회의 제목 : {singleMinutes.title}</TextContent>
				<TextContent>
					참여자 :
					{singleMinutes.participants?.map(p => (
						<TextContent key={p}>{p}</TextContent>
					))}
				</TextContent>
				<TextContent>종료 일자 : {singleMinutes.Dday}</TextContent>
				<TextContent>회의 내용</TextContent>
				<ContentBox>{singleMinutes.content}</ContentBox>
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
			</ContentsContainer>
			<SpeechContainer>
				<HeaderBox>
					<TextSubTitle>스피치</TextSubTitle>
				</HeaderBox>
				<DivLine />
				<SpeechBox>
					<ul>
						{speeches[0] ? (
							speeches.map(speech => (
								<SpeechItem
									key={speech.id}
									spcId={speech.id}
									title={speech.title}
									updatedAt={speech.updated_at}
									author={speech.participant.member.nickname}
								/>
							))
						) : (
							<TextSubTitle>스피치를 등록해주세요.</TextSubTitle>
						)}
					</ul>
				</SpeechBox>
				<BtnBox>
					<SpeechCreateBtn
						onClick={() =>
							navigate(
								`${routes.community}/${params.communityId}/minutes/${params.minutesId}/recordCreate`
							)
						}
						iCanSpeak={iCanSpeak}
					>
						스피치 등록
					</SpeechCreateBtn>
					<SpeechDeleteBtn onClick={deleteMySpeech} iCanSpeak={iCanSpeak}>
						내 스피치 삭제
					</SpeechDeleteBtn>
				</BtnBox>
				<br />
				<HeaderBox>
					<TextSubTitle>회의 결과</TextSubTitle>
				</HeaderBox>
				<DivLine />
				<br />
				{singleMinutes.conclusion ? (
					<ContentBox>{singleMinutes.conclusion}</ContentBox>
				) : (
					<EndMinutesBox>
						<TextSubTitle>회의가 진행중입니다.</TextSubTitle>
						<br />
						<EndBtn isAuthor={isAuthor} onClick={endMinutes}>
							회의 종료
						</EndBtn>
					</EndMinutesBox>
				)}
			</SpeechContainer>
		</Main>
	);
}

export default MinutesDetail;
