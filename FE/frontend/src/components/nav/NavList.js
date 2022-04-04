import styled from 'styled-components';

const List = styled.ul`
	display: flex;
	justify-content: end;
	align-items: center;
	width: 50%;
	font-size: 20px;
	margin: 10px;
	padding: 0;
	list-style: none;
`;

function NavList({ children }) {
	return <List>{children}</List>;
}

export default NavList;
