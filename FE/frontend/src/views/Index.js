import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetMyProfile, apiRefreshToken } from '../api/accounts';
import Navbar from '../components/nav/Navbar';
import { getUserData, login, logout } from '../store/user';

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

function Index() {
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector(state => state.user);

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

	useEffect(async () => {
		if (isLoggedIn) {
			try {
				const response = await apiGetMyProfile();
				dispatch(
					getUserData({
						...response.data,
					})
				);
			} catch (e) {
				dispatch(logout());
			}
		}
	}, [isLoggedIn]);

	return (
		<Container>
			<Navbar />
			<Outlet />
		</Container>
	);
}

export default Index;
