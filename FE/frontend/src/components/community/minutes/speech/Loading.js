import styled from 'styled-components';
import logo from '../../../../assets/logo.png';

const Spinner = styled.div`
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;

	span {
		font-size: 2rem;
		padding-right: 1rem;
	}
`;
const HalfSpinner = styled.div`
	width: 50px;
	height: 50px;
	border: 5px solid ${props => props.theme.fontColor};
	border-top: 3px solid transparent;
	border-radius: 50%;
	animation: spin 1.5s linear 0s infinite;
`;
const Logo = styled.img`
	width: 75px;
	height: 75px;
	margin-right: 10px;
`;

function Loading() {
	return (
		<Spinner>
			<Logo src={logo} />
			<span>Please wait, AI is working</span>
			<HalfSpinner />
		</Spinner>
	);
}

export default Loading;
