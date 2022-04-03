// url 변수화 해서 관리
const routes = {
	main: '/',
	login: '/login',
	signup: '/signup',
	userProfile: '/profile/:id',
	// community
	community: '/community',
	admin: 'admin',
	members: 'members',
	recordCreate: 'minutes/:minutesId/recordCreate',
	// minutes
	minutesList: 'minutes',
	minutesDetail: 'minutes/:minutesId',
	minutesCreate: 'minutes/minutesCreate',
	minutesUpdate: 'minutes/:minutesId/update',
	// speech
	speechCreate: 'minutes/:minutesId/speechCreate',
	// posts
	posts: 'posts',
	postCreate: 'posts/postcreate',
	postDetail: 'posts/:postId',
};

export default routes;
