import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RiCommunityLine } from 'react-icons/ri';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Main from '../../components/community/MainStart';
import TextSubTitle from '../../components/common/TextSubTitle';
import DivLine from '../../components/community/main/DivLine';
import MainBox from '../../components/community/main/MainBox';
import SubBox from '../../components/community/main/SubBox';
import { fetchMinutesByComId } from '../../store/minutes';

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

function Community() {
	const [date, setDate] = useState(new Date());
	const { communityId } = useParams();
	const dispatch = useDispatch();
	const {
		name,
		private_code: privateCode,
		image,
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
							<img src={`${process.env.REACT_APP_API_URL}${image}`} alt='' />
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
			<SubBox>
				<TextSubTitle>회원 목록</TextSubTitle>
				<DivLine />
			</SubBox>
			<SubBox>
				<TextSubTitle>일정 관리</TextSubTitle>
				<DivLine />
			</SubBox>
		</Main>
	);
}

export default Community;
