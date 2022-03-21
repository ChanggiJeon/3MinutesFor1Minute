import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
	${reset};

	body {
		background-color: ${props => props.theme.backgroundColor};
		color: ${props => props.theme.fontColor};
	}

	body * {
		font-family: 'EliceDigitalBaeum-Bd';
	}

	h1 {
		font-family: 'HoengseongHanu';
	}



	@font-face {
		font-family: 'EliceDigitalBaeum-Bd';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'HoengseongHanu';
		src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/HoengseongHanu.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
`;

export default GlobalStyles;