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
	height: 40px;
	cursor: pointer;
`;
const Divider = styled(DivLine)`
	height: 1.5px;
	margin: 15px 0;
`;
const Title = styled(TextSubTitle)`
	width: 60%;
`;
const Author = styled(TextSubTitle)`
	width: 15%;
`;
const Deadline = styled(TextSubTitle)`
	width: 10%;
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
			<Divider />
		</Minutes>
	);
}

export default MainMinutesItem;
