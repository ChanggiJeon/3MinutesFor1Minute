import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
	detailMinutesById,
	deleteMinutesById,
	endMinutesById,
} from '../../../store/minutes';
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
	width: 60%;
`;
const UpdateBtn = styled(BlueMdBtn)`
	margin-right: 10px;
`;
const FileBtn = styled(BlueMdBtn)`
	margin-right: 10px;
`;
const DeleteBtn = styled(RedMdBtn)`
	margin-right: 10px;
`;
const EndBtn = styled(RedMdBtn)`
	margin-right: 10px;
`;
const SpeechBox = styled.div`
	display: flex;
	flex-direction: column;
	height: 200px;
	overflow-y: scroll;
`;
const SpeechCreateBtn = styled(BlueMdBtn)`
	margin-right: 10px;
`;
const FileItem = styled(TextContent)`
	cursor: pointer;
`;

function MinutesDetail() {
	const [isDeleted, setIsDeleted] = useState(undefined);
	const [iCanSpeak, setICanSpeak] = useState(false);
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// 리덕스에서 데이터 받아오기
	useEffect(() => {
		dispatch(detailMinutesById(params));
	}, []);
	const singleMinutes = useSelector(state => state.minutes.singleMinutes);
	const { speeches, referenceFile } = singleMinutes;
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
					Swal.fire('회의가 종료되었습니다.', '', 'success');
				} else if (result.isDenied) {
					Swal.fire('취소되었습니다.', '', 'info');
				}
			});
		}
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
					<TopBtnBox>
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
					{singleMinutes.participants.map(p => (
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
								downloadFile({ fileId: file.id, fileName: file.reference_file })
							}
						>
							{file.reference_file}
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
					>
						스피치 등록
					</SpeechCreateBtn>
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
						<EndBtn onClick={endMinutes}>회의 종료</EndBtn>
					</EndMinutesBox>
				)}
			</SpeechContainer>
		</Main>
	);
}

export default MinutesDetail;
