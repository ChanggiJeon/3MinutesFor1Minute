import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Provider from './Provider';
import GlobalStyles from './styles/GlobalStyles';
import Main from './views/Main';
import Login from './views/Login';

function App() {
	return (
		<Provider>
			<GlobalStyles />
			<Router>
				<Routes>
					<Route path={routes.main} element={<Main />} />
					<Route path={routes.login} element={<Login />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
