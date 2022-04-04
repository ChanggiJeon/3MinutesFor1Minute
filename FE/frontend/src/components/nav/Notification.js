import { useEffect, useState } from 'react';
import { VscBell } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import IconBtn from '../auth/IconBtn';

const NotificationBtn = styled(IconBtn)`
	position: relative;
`;

const NotificationContainer = styled.div`
	display: ${props => (props.isShown ? 'inherit' : 'none')};
	position: absolute;
	top: 60px;
	right: 0px;
	width: 300px;
	border: 1px solid black;
	background-color: ${props => props.theme.backgroundColor};
`;

const UnreadCountContainer = styled.div`
	position: absolute;
	right: -5px;
	top: -5px;
	border-radius: 50%;
	color: ${props => props.theme.subFontColor};
	background-color: red;
	width: 18px;
	height: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
`;

function Notification() {
	const [isShown, setShown] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setShown(false);
	}, [location]);
	const toggleShown = () => {
		if (isShown) {
			setShown(false);
		} else {
			setShown(true);
		}
	};

	return (
		<NotificationBtn type='button' onClick={() => toggleShown()}>
			<VscBell style={{ fontSize: '30px' }} />
			<UnreadCountContainer>9+</UnreadCountContainer>
			<NotificationContainer isShown={isShown}>Notification</NotificationContainer>
		</NotificationBtn>
	);
}

export default Notification;
