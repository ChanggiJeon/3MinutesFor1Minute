import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Main from '../../components/community/MainStart';
import TextSubTitle from '../../components/common/TextSubTitle';
import DivLine from '../../components/community/main/DivLine';
import MainBox from '../../components/community/main/MainBox';
import SubBox from '../../components/community/main/SubBox';
import { fetchMinutesByComId } from '../../store/minutes';

function Community() {
	const comId = useParams().communityId;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMinutesByComId(comId));
	}, []);

	return (
		<Main>
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
