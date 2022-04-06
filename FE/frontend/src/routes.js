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
	memberProfile: 'member/:memberNickname',
	// minutes
	minutesList: 'minutes',
	minutesCalender: 'calender',
	minutesDetail: 'minutes/:minutesId',
	minutesCreate: 'minutes/minutesCreate',
	minutesUpdate: 'minutes/:minutesId/update',
	recordCreate: 'minutes/:minutesId/recordCreate',
	// speech
	speechCreate: 'minutes/:minutesId/speechCreate',
	speechDetail: 'minutes/:minutesId/speech/:speechId',
	speechUpdate: 'minutes/:minutesId/speech/:speechId/update',
	// posts
	posts: 'posts',
	postCreate: 'posts/postcreate',
	postDetail: 'posts/:postId',
};

export default routes;
