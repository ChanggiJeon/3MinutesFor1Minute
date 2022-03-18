import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	padding: 20px;
	background-color: ${props => `${props.theme.backgroundColor}77`};
`;

export default Form;
