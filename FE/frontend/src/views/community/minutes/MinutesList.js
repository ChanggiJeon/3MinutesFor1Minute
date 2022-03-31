import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import routes from '../../../routes';
import Container from '../../../components/community/Container';
import Main from '../../../components/community/MainCenter';
import TextSubTitle from '../../../components/common/TextSubTitle';
import DivLine from '../../../components/community/main/DivLine';
import MainBox from '../../../components/community/minutes/list/MainBox';
import ContentsList from '../../../components/community/minutes/list/ContentsList';
import BlueMdBtn from '../../../components/common/BlueMdBtn';
import { fetchMinutesByComId } from '../../../store/minutes';
import HeaderBox from '../../../components/community/HeaderBox';

const MinutesContainer = styled(Container)`
	align-content: flex-start;
	align-items: center;
	width: 85%;
	height: 85%;
`;
const CreateBtn = styled(BlueMdBtn)`
	margin-right: 20px;
`;

function MinutesList() {
	const { communityId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(async () => {
		await dispatch(fetchMinutesByComId(communityId));
	}, []);

	return (
		<Main>
			<MinutesContainer>
				<HeaderBox>
					<TextSubTitle>회의록 목록</TextSubTitle>
					<CreateBtn
						onClick={() =>
							navigate(`${routes.community}/${communityId}/${routes.minutesCreate}`)
						}
					>
						작성하기
					</CreateBtn>
				</HeaderBox>
				<DivLine />
				<MainBox>
					<ContentsList />
				</MainBox>
			</MinutesContainer>
		</Main>
	);
}

export default MinutesList;
