import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/nav/Navbar';

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

function Index() {
	return (
		<Container>
			{/* 네비게이션 바 */}
      <Navbar />
			<Outlet />
		</Container>
	);
}

export default Index;
