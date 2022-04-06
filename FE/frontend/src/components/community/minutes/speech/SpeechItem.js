import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TitleBox from '../list/textBox/TitleBox';
import AuthorBox from '../list/textBox/AuthorBox';
import DeadlineBox from '../list/textBox/DeadlineBox';
import { getSingleSpeech } from '../../../../api/speech';

const Minutes = styled.li`
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	width: 90%;
	margin: 10px;
	cursor: pointer;
`;
const Title = styled(TitleBox)`
	justify-content: flex-start;
	padding: 10px 0;
	width: 100%;
`;
const Author = styled(AuthorBox)`
	justify-content: flex-start;
	padding: 0 0 10px 0;
	width: 100%;
`;
const Deadline = styled(DeadlineBox)`
	justify-content: flex-start;
	width: 100%;
`;

function SpeechItem({ spcId, title, updatedAt, author }) {
	// 클릭 시 디테일 페이지 이동에 필요한 함수값
	const { communityId, minutesId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<Minutes
			onClick={() => {
				getSingleSpeech(communityId, minutesId, spcId);
				navigate(`/community/${communityId}/minutes/${minutesId}/speech/${spcId}`);
			}}
		>
			<Title>스피치 제목: {title}</Title>
			<Author>작성자: {author}</Author>
			<Deadline>최근 수정일: {dayjs(updatedAt).format('YY-MM-DD HH:MM')}</Deadline>
		</Minutes>
	);
}

export default SpeechItem;
