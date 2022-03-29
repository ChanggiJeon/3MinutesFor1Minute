import styled from 'styled-components';

const LabelFile = styled.label`
	display: inline-block;
	width: 100px;
	height: 30px;
	background-color: ${props => props.theme.fontColor};
	color: #fff;
	cursor: pointer;
	line-height: 30px;
	border-radius: 5px;
	text-align: center;
`;

export default LabelFile;
