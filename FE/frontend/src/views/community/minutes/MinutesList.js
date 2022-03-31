import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '../../../routes';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import MainBox from '../../../components/community/minutes/list/MainBox';
import ContentsList from '../../../components/community/minutes/list/ContentsList';
import BlueMdBtn from '../../../components/common/BlueMdBtn';

const MinutesContainer = styled(Container)`
	align-content: flex-start;
	align-items: center;
	width: 85%;
	height: 85%;
`;

const CreateBtn = styled(BlueMdBtn)`
	margin-left: 65%;
`;

function MinutesList() {
	const { communityId } = useParams();
	const navigate = useNavigate();

	return (
		<Main>
			<MinutesContainer>
				<TextSubTitle>회의록 목록</TextSubTitle>
				<CreateBtn
					onClick={() =>
						navigate(`${routes.community}/${communityId}/${routes.minutesCreate}`)
					}
				>
					작성하기
				</CreateBtn>
				<DivLine />
				<MainBox>
					<ContentsList />
				</MainBox>
			</MinutesContainer>
		</Main>
	);
}

export default MinutesList;
