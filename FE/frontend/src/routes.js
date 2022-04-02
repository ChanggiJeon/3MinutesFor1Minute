// url 변수화 해서 관리
const routes = {
	main: '/',
	login: '/login',
	signup: '/signup',
	userProfile: (id = ':id') => `/profile/${id}`,
	// community
	community: (communityId = ':communityId') => `/community/${communityId}`,
	admin: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}admin`,
	members: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}members`,
	records: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}records`,
	// minutes
	minutesList: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}minutes`,
	minutesDetail: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}minutes/detail`,
	minutesCreate: (communityId = '') =>
		`${
			communityId ? `${routes.community(communityId)}/` : ''
		}minutes/speechCreate`,
	// speech
	speechCreate: 'minutes/speechCreate',
	// posts
	posts: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}posts`,
	postCreate: (communityId = '') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}posts/postcreate`,
	postDetail: (communityId = '', postId = ':postId') =>
		`${communityId ? `${routes.community(communityId)}/` : ''}posts/${postId}`,
	// community: '/community',
	// minutesList: 'minutes',
	// minutesDetail: 'minutes/:minutesId',
	// minutesCreate: 'minutes/minutesCreate',
	// minutesUpdate: 'minutes/:minutesId/update',
	// recordCreate: 'minutes/:minutesId/recordCreate',
	// speechCreate: 'minutes/:minutesId/speechCreate',
	// posts: 'posts',
	// postCreate: 'posts/postcreate',
	// postDetail: 'posts/:postId',
};

export default routes;
