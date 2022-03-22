import styled from "styled-components"

const NavContainer = styled.div`
	font-size: 20px;
	display: flex;
	align-items: center;

	a {
		text-decoration: none;
		color: ${props => props.theme.fontColor};
	}
`;

export default NavContainer;