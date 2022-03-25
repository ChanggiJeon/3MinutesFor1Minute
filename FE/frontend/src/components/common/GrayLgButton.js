import styled from 'styled-components';

const GrayLgButton = styled.button`
	background-color: ${props => props.theme.footerColor};
	border: 3px solid ${props => props.theme.sidebarColor};
	border-radius: 10px;
	padding: 20px 37px;
	text-align: center;
	text-decoration: none;
	display: none;
	font-size: 20px;
	cursor: pointer;

	& + & {
		margin-left: 1.5rem;
	}
`;

export default GrayLgButton;
