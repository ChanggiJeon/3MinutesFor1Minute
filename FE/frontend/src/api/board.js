import axios from 'axios';
import { BASE_URL, setToken } from './utils';

export const apiCreateboard = ({ communityId, title, content, isNotice, upload }) => 
  axios({
    method: 'post',
    url: `${BASE_URL}/${communityId}/boards/create/`,
    data: {
      title,
      content,
      is_notice: isNotice,
      upload,
    },
    // headers: {
    //   ...setToken(),
    // }
  });

export const apiGetBoards = ({ communityId }) =>
  axios({
    method: 'get',
    url: `${BASE_URL}/${communityId}/boards/`,
  });

export const apiGetBoardDetail = ({ communityId, postId }) =>
  axios({
    method: 'get',
    url: `${BASE_URL}/${communityId}/boards/${postId}/`,
  });

export const apiPutBoardDetail = ({ communityId, postId, title, content, isNotice, upload }) => 
  axios({
    method: 'put',
    url: `${BASE_URL}/${communityId}/boards/${postId}/update/`,
    data: {
      title,
      content,
      is_notice: isNotice,
      upload,
    },
  });

export const apiDeleteBoardDetail = ({ communityId, postId }) =>
  axios({
    method: 'delete',
    url: `${BASE_URL}/${communityId}/boards/${postId}/delete/`,
  });