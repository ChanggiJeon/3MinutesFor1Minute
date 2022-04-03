import styled from 'styled-components';

const WarningButton = styled.button`
	margin: 5px 0;
	background-color: ${props => props.theme.warnColor};
	color: ${props => props.theme.subFontColor};
	border-radius: 3px;
	padding: 3px;
	font-size: 20px;

	:disabled {
		opacity: 0.8;
	}
`;

export default WarningButton;
