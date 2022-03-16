import styled from 'styled-components';

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
`;

const Wrapper = styled.div`
	background-color: ${props => props.theme.backgroundColor};
	padding: 20px;
	border-radius: 5px;
`;

function Modal({ children, setMode }) {
	const handleMode = e => {
		if (e.target === e.currentTarget) {
			setMode(false);
		}
	};

	return (
		<Container onClick={handleMode}>
			<Wrapper>{children}</Wrapper>
		</Container>
	);
}

export default Modal;
