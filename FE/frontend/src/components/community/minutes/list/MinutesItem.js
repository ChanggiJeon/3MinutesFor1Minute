import styled from 'styled-components';

const Minutes = styled.li`
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 50px;
`;

function MinutesItem({ title }) {
	return <Minutes>| {title}</Minutes>;
}

export default MinutesItem;
