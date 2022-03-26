import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { apiRefreshToken } from '../api/accounts';
import Navbar from '../components/nav/Navbar';
import { login, logout } from '../store/user';

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

function Index() {
	const dispatch = useDispatch();

	useEffect(async () => {
		const refresh = localStorage.getItem('refresh') || '';

		if (refresh) {
			try {
				const response = await apiRefreshToken({ refresh });
				const { access } = response.data;

				if (access) {
					dispatch(
						login({
							isLoggedIn: true,
							// username: '',
							// profile: '',
							access,
							refresh,
						})
					);
					localStorage.setItem('access', access);
				}
			} catch (e) {
				dispatch(logout());
			}
		}
	}, []);

	return (
		<Container>
			{/* 네비게이션 바 */}
			<Navbar />
			<Outlet />
		</Container>
	);
}

export default Index;
