// url 변수화 해서 관리
const routes = {
	main: '/',
	login: '/login',
	signup: '/signup',
<<<<<<< HEAD
	// community
	community: '/community',
	records: 'records',
	minutesList: 'minutes',
  posts: 'posts',
  postCreate: 'posts/postcreate',
  postDetail: 'posts/:postId',
=======
	community: '/community/:communityId',
	minutesList: '/community/:communityId/minutes',
	minutesDetail: '/community/:communityId/minutes/detail',
	minutesCreate: '/community/:communityId/minutes/speechCreate',
	records: '/community/:communityId/records',
>>>>>>> d758960 (Feat/FE/Add : minutes list)
};

export default routes;
