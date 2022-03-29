import styled, { css, keyframes } from 'styled-components';

const wave = keyframes`
  from {
    opacity: 1;
    transform: scale(0.3,0.3);
  }
  to {
    opacity: 0;
    transform: scale(1,1);
  }
`;

const RecordsWave = styled.div`
	background-color: none;
	position: absolute;
  border: solid 10px ${props => props.theme.accentColor};
	border-radius: 100%;
	padding: 140px;
	margin-top: 1vh;
	${props => props.status !== 'recording' && `display: none;`}
	${props =>
		props.status === 'recording' &&
		css`
			animation: ${wave} 3s linear Infinite;
		`}
`;

export default RecordsWave;
