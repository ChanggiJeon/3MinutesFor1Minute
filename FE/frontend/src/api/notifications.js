import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiGetNotifications = () =>
	axios({
		method: 'get',
		url: `${BASE_URL}/notifications/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetUnreadNotificationsCount = () =>
	axios({
		method: 'get',
		url: `${BASE_URL}/notifications/new/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetNotificationDetail = ({ notificationId }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/notifications/${notificationId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiDeleteNotification = ({ notificaitionId }) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/notifications/${notificaitionId}/delete/`,
		headers: {
			...setToken(),
		},
	});
