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
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		transition: background-color 9999s;
		-webkit-text-fill-color: inherit;
	}
`;

export default Label;
