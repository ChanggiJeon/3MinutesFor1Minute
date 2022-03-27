// url 변수화 해서 관리
const routes = {
	main: '/',
	login: '/login',
	signup: '/signup',
	community: '/community/:communityId',
	minutesList: '/community/:communityId/minutes',
	records: '/community/:communityId/records',
};

export default routes;
