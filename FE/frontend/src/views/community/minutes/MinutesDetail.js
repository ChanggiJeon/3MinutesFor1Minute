import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailMinutesById } from '../../../store/minutes';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainStart';
import TextSubTitle from '../../../components/common/TextSubTitle';
import TextContent from '../../../components/common/TextContent';
import DivLine from '../../../components/community/main/DivLine';
import ContentBox from '../../../components/common/ContentBox';
import CancelBtn from '../../../components/community/minutes/CancelBtn';
import CompleteBtn from '../../../components/community/minutes/CompleteBtn';

const ContentsContainer = styled(Container)`
	flex-direction: column;
	border-radius: 15px;
	margin-top: 15px;
	width: 50%;
	height: 600px;
`;

const SpeechContainer = styled(Container)`
	flex-direction: column;
	align-content: flex-start;
	border-radius: 15px;
	margin-top: 15px;
	width: 40%;
`;

function MinutesDetail() {
	const [minutes, setMinutes] = useState({
		createdAt: '',
		author: '',
		title: '',
		participants: [],
		deadline: '',
		content: '',
		referenceFile: undefined,
	});
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(async () => {
		await dispatch(DetailMinutesById(params));
	}, []);
	const singleMinutes = useSelector(state => state.minutes.singleMinutes);
	useEffect(() => {
		if (minutes) {
			// 리덕스에서 가져온 sinlgeMinutes에서 데이터 뽑아오기!
			const writtenDate = singleMinutes?.created_at;
			const author = singleMinutes?.minute_participants.filter(
				member => member.is_assignee
			)[0]?.member?.nickname;
			const title = singleMinutes?.title;
			const tmpParticipants = singleMinutes?.minute_participants;
			const tmpDeadline = singleMinutes?.deadline;
			const content = singleMinutes?.content;
			const referenceFile = singleMinutes?.reference_file;
			// 필수 정보 식별 시 데이터 입력!
			if (title && tmpParticipants && tmpDeadline && content) {
				// 작성일자 데이터 가공
				const createdAt = `${writtenDate.substr(2, 2)}.
				${writtenDate.substr(5, 2)}. ${writtenDate.substr(8, 2)}.
				${writtenDate.substr(11, 2)}시 ${writtenDate.substr(14, 2)}분`;
				// 참여자 데이터 가공
				const participants = tmpParticipants.map(user => user.member.nickname);
				// 종료일 데이터 가공
				const deadline = `${tmpDeadline.substr(2, 2)}.
				${tmpDeadline.substr(5, 2)}. ${tmpDeadline.substr(8, 2)}.
				${tmpDeadline.substr(11, 2)}시 ${tmpDeadline.substr(14, 2)}분`;
				// state 변경
				setMinutes(() => ({
					createdAt,
					author,
					title,
					participants,
					deadline,
					content,
					referenceFile,
				}));
			}
		}
	}, [singleMinutes]);

	return (
		<Main>
			<ContentsContainer>
				<TextSubTitle>회의 내용</TextSubTitle>
				<CompleteBtn type='submit' form='createForm'>
					작성 완료
				</CompleteBtn>
				<CancelBtn
					onClick={() =>
						navigate(
							`community/${params.communityId}/minutes/${params.minutesId}/update`
						)
					}
				>
					작성 취소
				</CancelBtn>
				<DivLine />
				<TextContent>작성 일자 : {minutes.createdAt}</TextContent>
				<TextContent>작성자 : {minutes.author}</TextContent>
				<TextContent>회의 제목 : {minutes.title}</TextContent>
				<TextContent>
					참여자 :
					{minutes.participants.map((p, idx) => (
						<TextContent key={p}>{p}</TextContent>
					))}
				</TextContent>
				<TextContent>종료 일자 : {minutes.deadline}</TextContent>
				<TextContent>회의 내용</TextContent>
				<ContentBox>{minutes.content}</ContentBox>
				<TextContent>첨부 파일 : {minutes.referenceFile}</TextContent>
			</ContentsContainer>
			<SpeechContainer>
				<TextSubTitle>스피치</TextSubTitle>
				<DivLine />
			</SpeechContainer>
		</Main>
	);
}

export default MinutesDetail;
