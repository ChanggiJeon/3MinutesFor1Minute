import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/nav/Sidebar';

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

function ComIndex() {
	return (
		<Container>
			{/* 사이드 바 */}
      <Sidebar />
			<Outlet />
		</Container>
	);
}

export default ComIndex;
