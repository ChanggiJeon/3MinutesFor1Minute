import { useParams } from 'react-router-dom';
import {
	FaAddressCard,
	FaHome,
	FaBook,
	FaBullhorn,
	FaCalendarCheck,
	FaAddressBook,
} from 'react-icons/fa';

function sidebarData() {
	const comId = useParams().communityId;

	return [
		{
			name: 'Profile',
			title: '닉네임',
			path: '/',
			icon: <FaAddressCard />,
		},
		{
			name: 'Home',
			title: '홈으로',
			path: '/',
			icon: <FaHome />,
		},
		{
			name: 'Minutes',
			title: '회의록',
			path: {
				List: `/community/${comId}/minutes`,
				Calander: '/',
			},
			icon: <FaBook />,
		},
		{
			name: 'Board',
			title: '게시판',
			path: '/',
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
			path: '/',
			icon: <FaAddressBook />,
		},
	];
}

export default sidebarData;
