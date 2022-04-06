import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NumBox from './textBox/NumBox';
import TitleBox from './textBox/TitleBox';
import DateBox from './textBox/DateBox';
import AuthorBox from './textBox/AuthorBox';
import DeadlineBox from './textBox/DeadlineBox';

const Minutes = styled.li`
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 50px;
	cursor: pointer;
`;
const Title = styled(TitleBox)`
	justify-content: start;
	padding-left: 10px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

function MinutesItem({ no, minId, title, date, deadline, author, isClosed }) {
	// 디데이 구하는 공식
	const today = new Date();
	const deadLine = new Date(deadline);
	const gap = deadLine.getTime() - today.getTime();
	const result = Math.ceil(gap / (1000 * 60 * 60 * 24));
	const Dday = gap > 0 ? `D-${result}` : '종료';
	// 클릭 시 디테일 페이지 이동에 필요한 함수값
	const { communityId } = useParams();
	const navigate = useNavigate();
	return (
		<Minutes
			onClick={() => {
				navigate(`/community/${communityId}/minutes/${minId}`);
			}}
		>
			<NumBox>{no}</NumBox>
			<Title>{title}</Title>
			<DateBox>
				{date.substr(2, 2)}/{date.substr(5, 2)}/{date.substr(8, 2)}{' '}
				{date.substr(11, 5)}
			</DateBox>
			<AuthorBox>{author}</AuthorBox>
			{isClosed ? (
				<DeadlineBox>종료</DeadlineBox>
			) : (
				<DeadlineBox>{Dday}</DeadlineBox>
			)}
		</Minutes>
	);
}

export default MinutesItem;
