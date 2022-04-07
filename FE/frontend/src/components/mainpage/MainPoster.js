import styled from 'styled-components';
import mainpageImg from '../../assets/main_bg.png';

const MainPoster = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	background-image: url(${mainpageImg});
	background-size: cover;
	background-repeat: no-repeat;
`;

export default MainPoster;
