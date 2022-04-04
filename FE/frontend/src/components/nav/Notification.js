import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { VscBell } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
	apiDeleteNotification,
	apiGetNotificationDetail,
	apiGetNotifications,
	apiGetUnreadNotificationsCount,
} from '../../api/notifications';
import IconBtn from '../auth/IconBtn';

const NotificationBtn = styled(IconBtn)`
	position: relative;
`;

const NotificationContainer = styled.div`
	display: ${props => (props.isShown ? 'inherit' : 'none')};
	position: absolute;
	top: 70px;
	right: 0px;
	width: 300px;
	max-height: 500px;
	overflow-y: hidden;
	border: 1px solid black;
	background-color: ${props => props.theme.backgroundColor};
`;

const NotificationWrapper = styled.div`
	overflow-y: auto;
	max-height: 450px;
`;

const NotificationTitle = styled.div`
	text-align: start;
	padding: 10px;
	border-bottom: 1px solid grey;
`;

const NotificationContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
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

const Content = styled.div`
	cursor: pointer;
	width: 85%;
	font-size: 12px;
	line-height: 15px;
`;

const ExitBtn = styled.button`
	border: none;
	font-size: 30px;
	width: 15%;
	background-color: inherit;
	cursor: pointer;
`;

function Notification() {
	const [isShown, setShown] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const location = useLocation();

	useEffect(() => {
		setShown(false);
	}, [location]);

	useEffect(() => {
		const getCount = setInterval(() => getUnreadNotificationsCount(), 3000);
		return () => clearInterval(getCount);
	}, []);

	const getUnreadNotificationsCount = async () => {
		try {
			const response = await apiGetUnreadNotificationsCount();
			setUnreadCount(parseInt(response.data[0].split(': ')[1] || '0', 10));
		} catch (e) {
			if (e.response.status === 404) {
				setUnreadCount(0);
			}
		}
	};

	const getNotifications = async () => {
		try {
			const response = await apiGetNotifications();
			console.log(response.data);
		} catch (e) {
			if (e.response.status === 404) {
				setNotifications([]);
			}
		}
	};

	const readNotification = async target => {
		try {
			await apiGetNotificationDetail({ notificationId: target.id });
			console.log('읽음');
			getNotifications();
		} catch (e) {
			// error
		}
	};

	const deleteNotification = async targetId => {
		try {
			await apiDeleteNotification({ notificaitionId: targetId });
			console.log('제거');
			getNotifications();
		} catch (e) {
			// error
		}
	};

	const toggleShown = () => {
		if (isShown) {
			setShown(false);
		} else {
			setShown(true);
			getNotifications();
		}
	};

	const noticnt = () => {
		if (unreadCount === 0) {
			return null;
		}
		if (unreadCount < 10) {
			return <UnreadCountContainer>{unreadCount}</UnreadCountContainer>;
		}
		return <UnreadCountContainer>9+</UnreadCountContainer>;
	};

	return (
		<>
			<NotificationBtn type='button' onClick={() => toggleShown()}>
				<VscBell style={{ fontSize: '30px' }} />
				{noticnt()}
			</NotificationBtn>
			<NotificationContainer isShown={isShown}>
				<NotificationTitle>알림</NotificationTitle>
				<NotificationWrapper>
					{notifications.length > 0 ? (
						notifications.map(e => (
							<NotificationContent
								key={e}
								style={{ color: e.is_read ? 'inherit' : 'grey' }}
							>
								<Content onClick={() => readNotification(e)}>{e.content}</Content>
								<ExitBtn onClick={() => deleteNotification(e.id)}>
									<FiX />
								</ExitBtn>
							</NotificationContent>
						))
					) : (
						<NotificationContent>알림이 없습니다.</NotificationContent>
					)}
				</NotificationWrapper>
			</NotificationContainer>
		</>
	);
}

export default Notification;
