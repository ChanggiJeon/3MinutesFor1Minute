import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RiCommunityLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import Main from '../../components/community/MainStart';
import TextSubTitle from '../../components/common/TextSubTitle';
import DivLine from '../../components/community/main/DivLine';
import MainBox from '../../components/community/main/MainBox';
import SubBox from '../../components/community/main/SubBox';
import { fetchMinutesByComId } from '../../store/minutes';
import routes from '../../routes';

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 10px;

	& > div {
		display: flex;
		align-items: center;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 30px;
	font-size: 32px;

	img {
		width: 30px;
		height: 30px;
		object-fit: cover;
		border-radius: 50%;
	}
`;

const MembersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	overflow: hidden;
`;

const MemberContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px;
`;

function Community() {
	const { communityId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		name,
		private_code: privateCode,
		image,
		member_set: memberSet,
	} = useSelector(state => state.community);

	useEffect(() => {
		dispatch(fetchMinutesByComId(communityId));
	}, []);

	return (
		<Main>
			<TitleContainer>
				<div>
					<ImageContainer>
						{image ? (
							<img src={`${process.env.REACT_APP_MEDIA_URL}${image}`} alt='' />
						) : (
							<RiCommunityLine />
						)}
					</ImageContainer>
					<TextSubTitle>{name}</TextSubTitle>
				</div>
				<div>참여코드 : {privateCode}</div>
			</TitleContainer>
			<MainBox>
				<TextSubTitle>회의록</TextSubTitle>
				<DivLine />
			</MainBox>
			<SubBox>
				<TextSubTitle>게시글</TextSubTitle>
				<DivLine />
			</SubBox>
			<SubBox onClick={() => navigate(routes.members)}>
				<TextSubTitle>회원 목록</TextSubTitle>
				<DivLine />
				{memberSet && (
					<MembersContainer>
						{memberSet.map(e => (
							<MemberContent key={e.id}>
								<ImageContainer>
									{e.profile_image ? (
										<img
											src={`${process.env.REACT_APP_MEDIA_URL}${e.profile_image}`}
											alt=''
										/>
									) : (
										<FaUserCircle />
									)}
								</ImageContainer>
								{e.nickname}
							</MemberContent>
						))}
					</MembersContainer>
				)}
			</SubBox>
			<SubBox>
				<TextSubTitle>일정 관리</TextSubTitle>
				<DivLine />
			</SubBox>
		</Main>
	);
}

export default Community;
