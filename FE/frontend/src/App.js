import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Provider from './Provider';
import GlobalStyles from './styles/GlobalStyles';
import Main from './views/Main';
import Login from './views/Login';
import Index from './views/Index';
import Signup from './views/Signup';

function App() {
	return (
		<Provider>
			<GlobalStyles />
			<Router>
				<Routes>
					<Route element={<Index />}>
						<Route path={routes.main} element={<Main />} />
						<Route path={routes.login} element={<Login />} />
						<Route path={routes.signup} element={<Signup />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
