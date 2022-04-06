import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiGetMyCommunityList = () =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetCommunityInfo = ({ communityId }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/${communityId}/`,
		headers: {
			...setToken(),
		},
	});

export const apiPutCommunityInfo = ({ communityId, name, intro, isPrivate }) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/community/${communityId}/`,
		data: {
			name,
			intro,
			is_private: isPrivate,
		},
		headers: {
			...setToken(),
		},
	});

export const apiUpdateCommunityImage = ({ communityId, formData }) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/community/${communityId}/`,
		data: formData,
		headers: {
			...setToken(),
		},
	});

export const apiGetMyMemberProfile = ({ communityId }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/${communityId}/self/`,
		headers: {
			...setToken(),
		},
	});

export const apiGetMemberProfile = ({ communityId, nickname }) =>
	axios({
		method: 'get',
		url: `${BASE_URL}/community/${communityId}/profile/${nickname}/`,
		headers: {
			...setToken(),
		},
	});

export const apiPutMember = ({ communityId, memberId, nickname, bio }) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/community/${communityId}/member/${memberId}/update/`,
		data: {
			nickname,
			bio,
		},
		headers: {
			...setToken(),
		},
	});

export const apiUpdateMemberProfile = ({ communityId, memberId, formData }) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/community/${communityId}/member/${memberId}/update/`,
		data: formData,
		headers: {
			...setToken(),
		},
	});

export const apiWithdrawMember = ({ communityId, memberId }) =>
	axios({
		method: 'delete',
		url: `${BASE_URL}/community/${communityId}/member/${memberId}/withdraw/`,
		headers: {
			...setToken(),
		},
	});

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
		url: `${BASE_URL}/community/${communityId}/member/${memberId}/withdraw/`,
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

export const apiApproveMember = ({ communityId, memberId }) =>
	axios({
		method: 'put',
		url: `${BASE_URL}/community/${communityId}/waitinglist/${memberId}/approval/`,
		headers: {
			...setToken(),
		},
	});
