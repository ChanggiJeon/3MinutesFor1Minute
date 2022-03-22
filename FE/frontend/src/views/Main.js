import { useState } from 'react';
import styled from 'styled-components';
import CreateCommunity from '../components/main/CreateCommunity';
import Modal from '../components/modal/Modal';

const Test = styled.div`
	background-color: ${props => props.theme.backgroundColor};
	color: ${props => props.theme.fontColor};
`;

function Main() {
	const [isCreateMode, setCreateMode] = useState(true);

	const CreateCommunityModal = isCreateMode && (
		<Modal setMode={setCreateMode}>
			<CreateCommunity />
		</Modal>
	);

	return <Test>Hello~{CreateCommunityModal}</Test>;
}

export default Main;
