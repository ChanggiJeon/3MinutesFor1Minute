import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { RiCommunityLine } from 'react-icons/ri';
import MainPoster from '../components/mainpage/MainPoster';
import CreateCommunity from '../components/main/CreateCommunity';
import Modal from '../components/modal/Modal';
import MainTextBG from '../components/mainpage/MainTextBG';
import TextTitle from '../components/common/TextTitle';
import TextSubTitle from '../components/common/TextSubTitle';
import Container from '../components/common/Container';
import MainBtn from '../components/mainpage/MainBtn';
import ApplyCommunity from '../components/main/ApplyCommunity';
import { apiGetMyCommunityList } from '../api/community';

const MainSubTitle = styled(TextSubTitle)`
	color: #585858;
`;

const CommunityContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	a {
		color: inherit;
		text-decoration: none;
	}
`;

const Contents = styled.div`
	margin: 20px;
	padding: 10px;
	width: 300px;
	min-height: 200px;
	border: 1px solid black;
	border-radius: 5px;
	line-height: 1.5;
`;

const CommunityImgContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 200px;
	font-size: 32px;

	img {
		width: 300px;
		height: 200px;
		object-fit: cover;
	}
`;

const CommunityName = styled.div`
	font-size: 24px;
	margin-bottom: 5px;
	text-align: center;
`;
const CommunityDescription = styled.div`
	text-align:center;
`
const Msg1 = '회의 시간, 3분';
const Msg2 = '바쁜 직장인들을 위한 새로운 AI Solution';
const Msg3 = 'Work Less, Better Work';

function Main() {
	const [isApplyMode, setApplymode] = useState(false);
	const [isCreateMode, setCreateMode] = useState(false);
	const [communityList, setCommunityList] = useState([]);
	const { isLoggedIn } = useSelector(state => state.user);

	useEffect(() => {
		if (isLoggedIn) {
			getCommunityList();
		}
	}, [isLoggedIn]);

	const getCommunityList = async () => {
		try {
			const response = await apiGetMyCommunityList();
			setCommunityList(response.data);
		} catch (e) {
			// error
		}
	};

	const handleApplyCommunity = () => {
		if (isLoggedIn) {
			setApplymode(true);
		} else {
			Swal.fire({
				icon: 'info',
				text: '로그인이 필요한 서비스입니다.',
			});
		}
	};

	const handleCreateCommunity = () => {
		if (isLoggedIn) {
			setCreateMode(true);
		} else {
			Swal.fire({
				icon: 'info',
				text: '로그인이 필요한 서비스입니다.',
			});
		}
	};

	const ApplyCommunityModal = isApplyMode && (
		<Modal setMode={setApplymode}>
			<ApplyCommunity setMode={setApplymode} getList={getCommunityList} />
		</Modal>
	);

	const CreateCommunityModal = isCreateMode && (
		<Modal setMode={setCreateMode}>
			<CreateCommunity />
		</Modal>
	);

	return (
		<>
			{/* 메인 포스터 + 소개글 */}
			<MainPoster>
				<MainTextBG>
					<TextTitle>{Msg1}</TextTitle>
					<MainSubTitle>{Msg2}</MainSubTitle>
					<MainSubTitle>{Msg3}</MainSubTitle>
				</MainTextBG>
			</MainPoster>
			{/* 화면 하단 버튼 */}
			<Container>
				<MainBtn onClick={handleApplyCommunity}>커뮤니티 가입</MainBtn>
				<MainBtn onClick={handleCreateCommunity}>커뮤니티 생성</MainBtn>
			</Container>
			<CommunityContainer>
				{isLoggedIn &&
					communityList.map(e => (
						<Link to={`/community/${e.id}`} key={e.id}>
							<Contents>
								<CommunityImgContainer>
									{e.image ? (
										<img src={`${process.env.REACT_APP_MEDIA_URL}${e.image}`} alt='' />
									) : (
										<RiCommunityLine />
									)}
								</CommunityImgContainer>
								<CommunityName>{e.name}</CommunityName>
								<CommunityDescription>{e.intro}</CommunityDescription>
							</Contents>
						</Link>
					))}
			</CommunityContainer>
			{ApplyCommunityModal}
			{CreateCommunityModal}
		</>
	);
}

export default Main;
