import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/nav/Sidebar';
import routes from '../../routes';

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
	const navigate = useNavigate();

	useEffect(() => {
		if (!token && !isLoggedIn) {
			navigate(routes.main);
		}
	}, [isLoggedIn]);

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
