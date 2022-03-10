import { createGlobalStyle } from "styled-components"
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
	${reset};

	body {
		background-color: ${props => props.theme.backgroundColor};
		color: ${props => props.theme.fontColor};
		font-family: 'EliceDigitalBaeum-Bd';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}
`;

export default GlobalStyles;