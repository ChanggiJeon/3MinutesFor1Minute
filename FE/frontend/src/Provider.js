// 테마 선언한 것을 app 전체에 적용
import { ThemeProvider } from 'styled-components';
import { Provider as StateProvider } from 'react-redux';
import theme from './styles/theme';
import store from './store';

function Provider({ children }) {
	return (
		<StateProvider store={store}>
			<ThemeProvider theme={theme.base}>{children}</ThemeProvider>
		</StateProvider>
	);
}

export default Provider;