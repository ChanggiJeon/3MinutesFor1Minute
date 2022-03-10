import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Main from './views/Main'
import Provider from './Provider';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <Provider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path={routes.main} element={<Main/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
