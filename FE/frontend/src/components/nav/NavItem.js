import styled from 'styled-components';

const Item = styled.li`
	margin: 15px;

	a {
		text-decoration: none;
		color: ${props => props.theme.fontColor};
	}
`;

function NavItem({ children }) {
	return <Item>{children}</Item>;
}

export default NavItem;
