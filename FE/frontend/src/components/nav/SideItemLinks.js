import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SideItemLinks = styled(Link)`
	display: flex;
	align-items: center;
	padding: 0 2rem;
	font-size: 20px;
	text-decoration: none;
	color: ${props => props.theme.fontColor};
	cursor: pointer;
	width: 50%;
	height: 100%;

	&:hover {
		border: 3px solid black;
		border-radius: 5px;
	}
`;

export default SideItemLinks;
