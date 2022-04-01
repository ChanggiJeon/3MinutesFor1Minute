import styled from 'styled-components';
import { FaLockOpen } from 'react-icons/fa';

const OpenIcon = styled(FaLockOpen)`
	margin: 0 0 0 15px;
	font-size: 30px;
	color: ${props => props.theme.accentColor};
	cursor: pointer;
`;

export default OpenIcon;
