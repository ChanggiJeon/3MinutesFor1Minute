import { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { VscBell } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	apiDeleteNotification,
	apiGetNotificationDetail,
	apiGetNotifications,
	apiGetUnreadNotificationsCount,
} from '../../api/notifications';
import IconBtn from '../auth/IconBtn';

const OutsideContainer = styled.div`
	display: ${props => (props.isShown ? 'inherit' : 'none')};
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const OutsideWrapper = styled.div``;

const NotificationBtn = styled(IconBtn)`
	position: relative;
`;

const NotificationContainer = styled.div`
	z-index: 9999;
	position: absolute;
	top: 70px;
	right: 0px;
	width: 350px;
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

	&.checked {
		background-color: ${props => props.theme.footerColor};
		color: grey;
	}
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
	const navigate = useNavigate();

	useEffect(() => {
		setShown(false);
	}, [location]);

	useEffect(() => {
		const getCount = setInterval(() => getUnreadNotificationsCount(), 3000);
		return () => clearInterval(getCount);
	}, []);

	useEffect(() => getNotifications(), [unreadCount]);

	const getUnreadNotificationsCount = async () => {
		try {
			const {
				data: { response },
			} = await apiGetUnreadNotificationsCount();
			setUnreadCount(response);
		} catch (e) {
			if (e.response.status === 404) {
				setUnreadCount(0);
			}
		}
	};

	const getNotifications = async () => {
		try {
			const response = await apiGetNotifications();
			setNotifications(response.data);
		} catch (e) {
			if (e.response.status === 404) {
				setNotifications([]);
			}
		}
	};

	const readNotification = async target => {
		try {
			const {
				data: { community_id: communityId, minute_id: minutesId },
			} = await apiGetNotificationDetail({ notificationId: target.id });

			getUnreadNotificationsCount();
			getNotifications();

			navigate(`/community/${communityId}/minutes/${minutesId}`);
		} catch (e) {
			// error
		}
	};

	const checkNotification = async target => {
		try {
			await apiGetNotificationDetail({ notificationId: target.id });

			getUnreadNotificationsCount();
			getNotifications();
		} catch (e) {
			// error
		}
	};

	const deleteNotification = async target => {
		try {
			await apiDeleteNotification({ notificaitionId: target.id });
			getUnreadNotificationsCount();
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

	const handleShown = e => {
		if (e.target === e.currentTarget) {
			setShown(false);
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
			<OutsideContainer isShown={isShown} onClick={handleShown}>
				<OutsideWrapper>
					<NotificationContainer>
						<NotificationTitle>알림</NotificationTitle>
						<NotificationWrapper>
							{notifications.length > 0 ? (
								notifications.map(e => (
									<NotificationContent key={e.id} className={e.is_read ? 'checked' : ''}>
										<Content onClick={() => readNotification(e)}>{e.content}</Content>
										<ExitBtn onClick={() => checkNotification(e)}>
											<FiCheck />
										</ExitBtn>
										<ExitBtn onClick={() => deleteNotification(e)}>
											<FiX />
										</ExitBtn>
									</NotificationContent>
								))
							) : (
								<NotificationContent>알림이 없습니다.</NotificationContent>
							)}
						</NotificationWrapper>
					</NotificationContainer>
				</OutsideWrapper>
			</OutsideContainer>
		</>
	);
}

export default Notification;
