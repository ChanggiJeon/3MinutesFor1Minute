import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TextSubTitle from '../common/TextSubTitle';
import DivLine from './main/DivLine';

const Minutes = styled.li`
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 95%;
	cursor: pointer;
`;
const Divider = styled(DivLine)`
	height: 1.5px;
	margin: 20px 0;
`;
const Title = styled(TextSubTitle)`
	padding: 0;
	width: 60%;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 0 10px;
`;
const Author = styled(TextSubTitle)`
	display: block;
	padding: 0;
	width: 15%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
const Deadline = styled(TextSubTitle)`
	display: block;
	padding: 0;
	width: 10%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

function MainMinutesItem({ minId, title, deadline, author }) {
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
			<Title>{title}</Title>
			<Author>{author}</Author>
			<Deadline>{Dday}</Deadline>
			<br />
			<Divider />
		</Minutes>
	);
}

export default MainMinutesItem;
