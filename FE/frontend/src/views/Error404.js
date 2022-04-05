import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextSubTitle from '../components/common/TextSubTitle';
import TextTitle from '../components/common/TextTitle';
import routes from '../routes';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
`;

function Error404() {
	const navigate = useNavigate();

	useEffect(() => {
		const out = setTimeout(() => navigate(routes.main), 5000);
		return () => clearTimeout(out);
	});

	return (
		<Container>
			<TextTitle>페이지를 찾을 수 없습니다.</TextTitle>
			<TextSubTitle>잠시 후 메인페이지로 이동합니다.</TextSubTitle>
		</Container>
	);
}

export default Error404;
