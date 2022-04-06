import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RiCommunityLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import Main from '../../components/community/MainStart';
import TextSubTitle from '../../components/common/TextSubTitle';
import DivLine from '../../components/community/main/DivLine';
import MainBox from '../../components/community/main/MainBox';
import SubBox from '../../components/community/main/SubBox';
import { fetchMinutesByComId } from '../../store/minutes';
import routes from '../../routes';
import { apiGetBoards } from '../../api/board';
import EmptyBtn from '../../components/auth/EmptyBtn';

const CommunitySubBox = styled(SubBox)`
	position: relative;
`;

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

const PostContainer = styled.div`
	padding: 10px;
`;

const PostCategory = styled.div`
	font-size: 20px;
	margin-bottom: 10px;
`;

const PostContent = styled(Link)`
	text-decoration: none;
	color: ${props => props.theme.accentColor};
	display: block;
	margin-bottom: 5px;
	font-size: 16px;
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
	margin: 5px;
`;

const More = styled(EmptyBtn)`
	position: absolute;
	top: 25px;
	right: 25px;
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
	const [recentNotice, setRecentNotice] = useState([]);
	const [recentPost, setRecentPost] = useState([]);
	const location = useLocation();

	const getPosts = async () => {
		try {
			const { data } = await apiGetBoards({ communityId });

			setRecentNotice(data.filter(e => e.is_notice).slice(0, 2));
			setRecentPost(data.filter(e => !e.is_notice).slice(0, 2));
		} catch (e) {
			// error
		}
	};

	useEffect(() => {
		dispatch(fetchMinutesByComId(communityId));
		getPosts();
	}, [location]);

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
			<CommunitySubBox>
				<More type='button' onClick={() => navigate(routes.posts)}>
					...더보기
				</More>
				<TextSubTitle>게시글</TextSubTitle>
				<DivLine />
				<PostContainer>
					<PostCategory>최근 공지</PostCategory>
					{recentNotice.map(e => (
						<PostContent to={`/community/${communityId}/posts/${e.id}`}>
							{e.title.length > 20 ? `${e.title.slice(0, 20)}...` : e.title}
						</PostContent>
					))}
				</PostContainer>
				<PostContainer>
					<PostCategory>최근 게시물</PostCategory>
					{recentPost.map(e => (
						<PostContent to={`/community/${communityId}/posts/${e.id}`}>
							{e.title.length > 20 ? `${e.title.slice(0, 20)}...` : e.title}
						</PostContent>
					))}
				</PostContainer>
			</CommunitySubBox>
			<CommunitySubBox>
				<TextSubTitle>회원 목록</TextSubTitle>
				<More type='button' onClick={() => navigate(routes.members)}>
					...더보기
				</More>
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
			</CommunitySubBox>
			<CommunitySubBox>
				<TextSubTitle>일정 관리</TextSubTitle>
				<DivLine />
			</CommunitySubBox>
		</Main>
	);
}

export default Community;
