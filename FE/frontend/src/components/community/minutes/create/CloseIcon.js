import styled from 'styled-components';
import { FaLock } from 'react-icons/fa';

const CloseIcon = styled(FaLock)`
	margin: 0 0 0 15px;
	font-size: 30px;
	color: ${props => props.theme.warnColor};
	cursor: pointer;
`;

export default CloseIcon;
