import styled from 'styled-components';

const ErrorMsg = styled.div`
	font-size: 12px;
	color: ${props => props.theme.warnColor};
	padding: 3px;

	svg {
		margin-right: 3px;
	}
`;

export default ErrorMsg;
