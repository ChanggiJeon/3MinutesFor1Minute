import styled from 'styled-components';

const ConfirmMsg = styled.div`
	font-size: 12px;
	color: ${props => props.theme.confirmColor};
	padding: 3px;

	svg {
		margin-right: 3px;
	}
`;

export default ConfirmMsg;
