import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MinutesItem from './MinutesItem';

const ListBox = styled.ul`
	width: 100%;
	height: 85%;
	padding: 10px;
`;

function ContentsList() {
	const minutesList = useSelector(state => state.minutes.allMinutes);

	return (
		<ListBox>
			{minutesList.map(minutes => (
				<MinutesItem key={minutes.id} title={minutes.title} />
			))}
		</ListBox>
	);
}

export default ContentsList;
