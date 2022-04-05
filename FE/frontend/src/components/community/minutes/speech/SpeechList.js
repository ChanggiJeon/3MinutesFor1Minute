import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import SpeechItem from './SpeechItem';
import DivLine from '../../main/DivLine';
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
	const speechList = useSelector(state => state.minutes.singleMinutes);
	return (
		<ListBox>
			<Divider />
			{speechList[0] ? (
				speechList.map(speech => (
					<SpeechItem
						key={speech.id}
						minId={speech.id}
						title={speech.title}
						date={speech.created_at}
						deadline={speech.deadline}
						author={speech.assignee.member.nickname}
						isClosed={speech.is_closed}
					/>
				))
			) : (
				<TextSubTitle>스피치를 등록해주세요.</TextSubTitle>
			)}
		</ListBox>
	);
}

export default ContentsList;
