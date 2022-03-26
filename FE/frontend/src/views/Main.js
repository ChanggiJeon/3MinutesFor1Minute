import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import MainPoster from '../components/mainpage/MainPoster';
import CreateCommunity from '../components/main/CreateCommunity';
import Modal from '../components/modal/Modal';
import MainTextBG from '../components/mainpage/MainTextBG';
import TextTitle from '../components/common/TextTitle';
import TextSubTitle from '../components/common/TextSubTitle';
import Container from '../components/common/Container';
import MainBtn from '../components/mainpage/MainBtn';
import ApplyCommunity from '../components/main/ApplyCommunity';

const MainSubTitle = styled(TextSubTitle)`
	color: #585858;
`;

const Msg1 = '회의 시간, 3분';
const Msg2 = '바쁜 직장인들을 위한 새로운 AI Solution';
const Msg3 = 'Work Less, Better Work';

function Main() {
	const [isApplyMode, setApplymode] = useState(false);
	const [isCreateMode, setCreateMode] = useState(false);
	const { isLoggedIn } = useSelector(state => state.user);

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
			<ApplyCommunity />
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
			{ApplyCommunityModal}
			{CreateCommunityModal}
		</>
	);
}

export default Main;
