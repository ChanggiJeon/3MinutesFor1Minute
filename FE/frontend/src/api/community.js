import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiCreateCommunity = ({ name, isPrivate, intro }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/community/create/`,
		data: {
			name,
			is_private: isPrivate,
			intro,
		},
		headers: {
			...setToken(),
		},
	});

export const apiUniqueCheckCommunityName = ({ name }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/uniquecheck/community_name/${name}/`,
		headers: {
			...setToken(),
		},
	});

export const apiSearchCommunityByCode = ({ code }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/search/code/${code}/`,
		headers: {
			...setToken(),
		},
	});

export const apiSearchCommunityByName = ({ name }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/search/name/${name}/`,
		headers: {
			...setToken(),
		},
	});

export const apiUniqueCheckNicknameInCommunity = ({ communityId, nickname }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/uniquecheck/${communityId}/nickname/${nickname}/`,
		headers: {
			...setToken(),
		},
	});

export const apiApplyCommunity = ({ communityId, nickname, bio }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/community/apply/${communityId}/`,
		data: {
			nickname,
			bio,
		},
		headers: {
			...setToken(),
		},
	});

export const apiGetCommunityMembers = ({ communityId }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/${communityId}/member/`,
		headers: {
			...setToken(),
		},
	});

export const apiSearchUser = ({ keyword }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/invite/search/${keyword}/`,
		headers: {
			...setToken(),
		},
	});

export const apiInviteUser = ({ communityId, id }) =>
	axios({
		method: 'post',
		url: `${BASE_URL}/community/invite/${communityId}/${id}/`,
		headers: {
			...setToken(),
		},
	});

export const apiDeleteMember = ({ communityId, memberId }) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/community/${communityId}/member/${memberId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiDeleteCommunity = ({ communityId }) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/community/${communityId}/`,
		headers: {
			...setToken(),
		},
	});
