import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

const Container = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-y: auto;
`;

const Wrapper = styled.div`
	background-color: ${props => props.theme.backgroundColor};
	padding: 20px;
	border-radius: 5px;
	position: relative;
`;

const ExitBtn = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
	border: none;
	font-size: 30px;
	background-color: inherit;
	cursor: pointer;
`;

function Modal({ children, setMode }) {
	const handleModeBtn = e => {
		setMode(false);
	};

	return (
		<Container>
			<Wrapper>
				<ExitBtn onClick={handleModeBtn}>
					<FiX />
				</ExitBtn>
				{children}
			</Wrapper>
		</Container>
	);
}

export default Modal;
