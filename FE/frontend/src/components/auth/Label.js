import styled from 'styled-components';

const Label = styled.label`
	border-bottom: 1px solid black;
	font-size: 20px;
	padding: 5px;
	display: flex;
	align-items: center;

	input {
		border: none;
		background: none;
		margin: 5px;
		font-size: 20px;

		:focus {
			outline: none;
		}
	}
`;

export default Label;
