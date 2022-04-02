import styled from 'styled-components';

const ContentBox = styled.div`
	word-break: normal;
	font-size: 18px;
	line-height: 28px;
	padding: 7px;
	width: 90%;
	height: 200px;
	margin-left: 10px;
	border: 2px solid ${props => props.theme.fontColor}50;
	border-radous: 5px;
	overflow-y: scroll;
`;

export default ContentBox;
