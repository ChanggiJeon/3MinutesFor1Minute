import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const Completed = styled.div`
	font-size: 5rem;
	color: #03fc4e;

	animation: bigger 0.5s linear;
`;

function LoadingComplete() {
	return (
		<Completed>
			Completed
			<FaCheck />
		</Completed>
	);
}

export default LoadingComplete;
