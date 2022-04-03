import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetMyMemberProfile } from '../../api/community';
import Sidebar from '../../components/nav/Sidebar';
import routes from '../../routes';
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

	const getMyMember = async () => {
		const response = await apiGetMyMemberProfile({ communityId });
		dispatch(getMemberData(response.data));
	};

	useEffect(() => {
		if (!token && !isLoggedIn) {
			navigate(routes.main);
		}
		if (isLoggedIn) {
			getMyMember();
		}
	}, [isLoggedIn, communityId]);

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
