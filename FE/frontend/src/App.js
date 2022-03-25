import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Provider from './Provider';
import GlobalStyles from './styles/GlobalStyles';
import Main from './views/Main';
import Login from './views/Login';
import Index from './views/Index';
import Signup from './views/Signup';
import Community from './views/community/Community';
import ComIndex from './views/community/Index';
import Posts from './views/community/Posts';
import PostCreate from './views/community/PostCreate';
import PostDetail from './views/community/PostDetail';

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
						<Route path={routes.community} element={<ComIndex />}>
							<Route index element={<Community />} />
              <Route path={`:communityId${routes.posts}`} element={<Posts />} />
              <Route path={`:communityId${routes.postCreate}`} element={<PostCreate />} />
              <Route path={`:communityId${routes.postDetail}/:postId`} element={<PostDetail />} />
						</Route>
					</Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
