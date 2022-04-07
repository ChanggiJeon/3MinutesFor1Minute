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
import MainMinutesItem from '../../components/community/MainMinutesItem';
import { fetchMainpageMinutesByComId } from '../../store/minutes';
import routes from '../../routes';
import { apiGetBoards } from '../../api/board';
import EmptyBtn from '../../components/auth/EmptyBtn';

const MainContainer = styled(Main)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 10px;
	box-sizing: border-box;
`;

const CommunityMainBox = styled(MainBox)`
	position: relative;
	grid-column: 1 / 3;
	box-sizing: border-box;
`;

const CommunitySubBox = styled(SubBox)`
	position: relative;
`;

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	grid-column: 1 / 3;

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
	color: ${props => props.theme.sideBarColor};
`;
const ListBox = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	padding: 10px;
	margin-top: 10px;
`;

function Community() {
	const [date, setDate] = useState(new Date());
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

			setRecentNotice(
				data
					.filter(e => e.is_notice)
					.reverse()
					.slice(0, 2)
			);
			setRecentPost(
				data
					.filter(e => !e.is_notice)
					.reverse()
					.slice(0, 2)
			);
		} catch (e) {
			// error
		}
	};

	useEffect(() => {
		dispatch(fetchMainpageMinutesByComId(communityId));
		getPosts();
	}, [location, communityId]);

	const mainpageMinutesList = useSelector(
		state => state.minutes.mainpageMinutes
	);

	return (
		<MainContainer>
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
			<CommunityMainBox>
				<More type='button' onClick={() => navigate(routes.minutesList)}>
					...더보기
				</More>
				<TextSubTitle>회의록</TextSubTitle>
				<DivLine />
				<ListBox>
					{mainpageMinutesList[0] ? (
						mainpageMinutesList.map(minutes => (
							<MainMinutesItem
								key={minutes.id}
								minId={minutes.id}
								title={minutes.title}
								deadline={minutes.deadline}
								author={minutes.assignee.member.nickname}
							/>
						))
					) : (
						<TextSubTitle>처리할 회의가 없습니다.</TextSubTitle>
					)}
				</ListBox>
			</CommunityMainBox>
			<CommunitySubBox>
				<More type='button' onClick={() => navigate(routes.posts)}>
					...더보기
				</More>
				<TextSubTitle>게시글</TextSubTitle>
				<DivLine />
				<PostContainer>
					<PostCategory>최근 공지</PostCategory>
					{recentNotice.map(e => (
						<PostContent to={`/community/${communityId}/posts/${e.id}`} key={e.id}>
							{e.title.length > 20 ? `${e.title.slice(0, 20)}...` : e.title}
						</PostContent>
					))}
				</PostContainer>
				<PostContainer>
					<PostCategory>최근 게시물</PostCategory>
					{recentPost.map(e => (
						<PostContent to={`/community/${communityId}/posts/${e.id}`} key={e.id}>
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
		</MainContainer>
	);
}

export default Community;
