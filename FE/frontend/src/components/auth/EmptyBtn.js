import styled from 'styled-components';

const Button = styled.button`
	border: none;
	background-color: inherit;
	padding: 0;
	font-size: 12px;
	cursor: pointer;
`;

function EmptyBtn(props) {
	return <Button {...props} />;
}

export default EmptyBtn;
