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
`;

function MinutesItem({ title, date, deadline }) {
	const today = new Date().getDate();
	const Dday =
		deadline.substr(8, 2) - today < 0
			? '종료'
			: `D-${deadline.substr(8, 2) - today}`;

	return (
		<Minutes>
			<NumBox>0</NumBox>
			<TitleBox>{title}</TitleBox>
			<DateBox>
				{date.substr(2, 2)}/{date.substr(5, 2)}/{date.substr(8, 2)}{' '}
				{date.substr(11, 5)}
			</DateBox>
			<AuthorBox>작성자</AuthorBox>
			<DeadlineBox>{Dday}</DeadlineBox>
		</Minutes>
	);
}

export default MinutesItem;
