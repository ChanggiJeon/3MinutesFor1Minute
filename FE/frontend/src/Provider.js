// 테마 선언한 것을 app 전체에 적용
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { Provider as StateProvider } from 'react-redux';
import user from './store/index.js';

function Provider ({ children }) {

  return (
    <StateProvider store={user}>
      <ThemeProvider theme={theme.base}>
        {children}
      </ThemeProvider>
    </StateProvider>
  );
}

export default Provider;