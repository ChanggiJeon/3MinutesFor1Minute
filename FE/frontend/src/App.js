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
import Records from './views/community/minutes/Records';
import Error404 from './views/Error404';
import Members from './views/community/Members';
import MinutesList from './views/community/minutes/MinutesList';
import MinutesDetail from './views/community/minutes/MinutesDetail';
import SpeechCreate from './views/community/minutes/SpeechCreate';

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
						<Route path={`${routes.community}/:communityId`} element={<ComIndex />}>
							<Route index element={<Community />} />
							<Route path={routes.records} element={<Records />} />
							<Route path={routes.members} element={<Members />} />
							<Route path={routes.posts} element={<Posts />} />
							<Route path={`${routes.posts}/:postId`} element={<PostDetail />} />
							<Route path={routes.postCreate} element={<PostCreate />} />
							<Route path={routes.minutesList} element={<MinutesList />} />
							<Route path={routes.minutesDetail} element={<MinutesDetail />} />
							<Route path={routes.minutesCreate} element={<SpeechCreate />} />
						</Route>
					</Route>
					<Route path='*' element={<Error404 />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
