import styled from 'styled-components';
import bgImg from '../../assets/meeting_room.png';

const Divider = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 100%;
	height: 100%;
	background-image: url(${bgImg});
	background-size: cover;
`;

export default Divider;
