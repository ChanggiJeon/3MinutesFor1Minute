import { useState } from 'react';
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
				<MainBtn onClick={() => setApplymode(true)}>커뮤니티 가입</MainBtn>
				<MainBtn onClick={() => setCreateMode(true)}>커뮤니티 생성</MainBtn>
			</Container>
			{ApplyCommunityModal}
			{CreateCommunityModal}
		</>
	);
}

export default Main;
