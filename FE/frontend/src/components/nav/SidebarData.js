import { useParams } from 'react-router-dom';
import {
	FaAddressCard,
	FaHome,
	FaBook,
	FaBullhorn,
	FaCalendarCheck,
	FaAddressBook,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

function sidebarData() {
	const { communityId } = useParams();
	const { id, nickname } = useSelector(state => state.member);

	return [
		{
			name: 'Profile',
			title: nickname,
			path: `/community/${communityId}/member/${id}`,
			icon: <FaAddressCard />,
		},
		{
			name: 'Home',
			title: '홈으로',
			path: `/community/${communityId}`,
			icon: <FaHome />,
		},
		{
			name: 'Minutes',
			title: '회의록',
			path: {
				List: `/community/${communityId}/minutes`,
				Calander: '/',
			},
			icon: <FaBook />,
		},
		{
			name: 'Board',
			title: '게시판',
			path: `/community/${communityId}/posts`,
			icon: <FaBullhorn />,
		},
		{
			name: 'Schedule',
			title: '일정 관리',
			path: '/',
			icon: <FaCalendarCheck />,
		},
		{
			name: 'Members',
			title: '참여자 목록',
			path: `/community/${communityId}/members`,
			icon: <FaAddressBook />,
		},
	];
}

export default sidebarData;
