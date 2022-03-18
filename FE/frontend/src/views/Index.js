import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

function Index() {
	return (
		<Container>
			<Outlet />
		</Container>
	);
}

export default Index;
