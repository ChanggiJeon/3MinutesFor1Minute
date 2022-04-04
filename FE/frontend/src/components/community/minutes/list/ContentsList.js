import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MinutesItem from './MinutesItem';
import NumBox from './textBox/NumBox';
import TitleBox from './textBox/TitleBox';
import DateBox from './textBox/DateBox';
import AuthorBox from './textBox/AuthorBox';
import DivLine from '../../main/DivLine';
import DeadlineBox from './textBox/DeadlineBox';
import TextSubTitle from '../../../common/TextSubTitle';

const ListBox = styled.ul`
	width: 100%;
	height: 85%;
	padding: 10px;
	margin-top: 10px;
`;
const Divider = styled(DivLine)`
	height: 1.5px;
	margin: 15px 0;
`;

function ContentsList() {
	const minutesList = useSelector(state => state.minutes.allMinutes);
	return (
		<ListBox>
			<NumBox>번호</NumBox>
			<TitleBox>제목</TitleBox>
			<DateBox>작성 일자</DateBox>
			<AuthorBox>작성자</AuthorBox>
			<DeadlineBox>D-day</DeadlineBox>
			<Divider />
			{minutesList[0] ? (
				minutesList.map(minutes => (
					<MinutesItem
						key={minutes.id}
						minId={minutes.id}
						title={minutes.title}
						date={minutes.created_at}
						deadline={minutes.deadline}
						author={minutes.assignee.member.nickname}
						isClosed={minutes.is_closed}
					/>
				))
			) : (
				<TextSubTitle>회의록을 작성해주세요.</TextSubTitle>
			)}
		</ListBox>
	);
}

export default ContentsList;
