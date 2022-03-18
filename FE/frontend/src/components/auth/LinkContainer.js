import styled from 'styled-components';

const LinkContainer = styled.div`
	font-size: 12px;
	display: flex;
	align-items: center;

	svg {
		font-size: 15px;
	}

	a {
		text-decoration: none;
		color: ${props => props.theme.fontColor};
	}

	* {
		margin: 0 5px;
	}
`;

export default LinkContainer;
