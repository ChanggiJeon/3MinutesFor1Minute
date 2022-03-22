import styled from 'styled-components';

const Button = styled.button`
	border: none;
	background-color: inherit;
	padding: 0;
	font-size: 16px;
	cursor: pointer;
`;

function IconBtn(props) {
	return <Button {...props} />;
}

export default IconBtn;
