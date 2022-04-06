import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import {
	apiGetCommunityInfo,
	apiGetMyMemberProfile,
} from '../../api/community';
import Sidebar from '../../components/nav/Sidebar';
import routes from '../../routes';
import { getCommunityData } from '../../store/community';
import { getMemberData } from '../../store/member';

const Container = styled.div`
	height: 100vh;
	display: flex;
	overflow: hidden;
`;

const OutletContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
`;

function ComIndex() {
	const token = localStorage.getItem('refresh');
	const { isLoggedIn } = useSelector(state => state.user);
	const { communityId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const getMyMember = async () => {
		try {
			const response = await apiGetMyMemberProfile({ communityId });
			if (!response.data.is_active) {
				Swal.fire({
					icon: 'info',
					text: '가입 신청이 승인되지 않았습니다. 관리자에게 문의하세요.',
				});
				navigate(routes.main);
			}
			dispatch(getMemberData(response.data));
		} catch (e) {
			navigate(routes.main);
		}
	};

	const getCommunityInfo = async () => {
		try {
			const response = await apiGetCommunityInfo({ communityId });
			dispatch(getCommunityData(response.data));
		} catch (e) {
			navigate(routes.main);
		}
	};

	useEffect(() => {
		if (!token && !isLoggedIn) {
			navigate(routes.main);
		}
		if (isLoggedIn) {
			getCommunityInfo();
			getMyMember();
		}
	}, [isLoggedIn, communityId, location]);

	return (
		<Container>
			{/* 사이드 바 */}
			<Sidebar />
			<OutletContainer>
				<Outlet />
			</OutletContainer>
		</Container>
	);
}

export default ComIndex;
