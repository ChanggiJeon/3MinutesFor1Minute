// url 변수화 해서 관리
const routes = {
	main: '/',
	login: '/login',
	signup: '/signup',
	// community
	community: '/community',
	minutesList: 'minutes',
	minutesDetail: 'minutes/:minutesId',
	minutesCreate: 'minutes/minutesCreate',
	minutesUpdate: 'minutes/:minutesId/update',
	recordCreate: 'minutes/:minutesId/recordCreate',
	speechCreate: 'minutes/:minutesId/speechCreate',
	posts: 'posts',
	postCreate: 'posts/postcreate',
	postDetail: 'posts/:postId',
};

export default routes;
