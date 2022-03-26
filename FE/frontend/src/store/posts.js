import { createSlice } from '@reduxjs/toolkit';

const postsInitialState = {
  page: 1,
  data: [
    {
      id: 0,
      isNotice: false,
      title: 'test1',
      content: 'test1 content',
      date: '22.03.21',
      author: 'SSAFY',
    },
    {
      id: 1,
      isNotice: true,
      title: 'test2',
      content: 'test2 content',
      date: '22.03.21',
      author: 'SSAFY',
    },
    {
      id: 2,
      isNotice: false,
      title: 'test3',
      content: 'test3 content',
      date: '22.03.21',
      author: 'SSAFY',
    },
  ]
};

const posts = createSlice({
	name: 'posts',
	initialState: postsInitialState,
	reducers: {
    createPost: (state, action) => {
      state.push(action.payload)
      return state
    },
    updatePost: (state, action) => {
      
    },
    deletePost: (state, action) => {

    },
	},
});

export const { createPost } = posts.actions;

export default posts.reducer;

