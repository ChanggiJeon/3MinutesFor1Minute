import styled from 'styled-components';

const SidebarMenu = styled.ul`
	width: 350px;
	height: 100%;
	background-color: ${props => `${props.theme.sidebarColor}`};
	box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
	overflow-y: hidden;

	:hover {
		overflow-y: auto;
	}
`;

export default SidebarMenu;
