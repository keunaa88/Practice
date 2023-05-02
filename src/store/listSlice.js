
import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import contentApi from "api/contentApi";

// 액션 생성자 함수 생성
const listPostAction = createAction('list/listPost');

//비동기 작업을 위한 createAsyncThunk
const listPost = createAsyncThunk(listPostAction, async ({category, skip, limit}, thunkAPI) => {
  const count = await contentApi.getCount(category);
  const { data } = await contentApi.getList(category, skip, limit); // 0, 10 (from 1~10 data) 1, 
  return { count, data: [...data] };
});

const initialState = {
      loading: 'idle',
      count: 0,
      posts: [{
        id: '',
        mainImg: '',
        title: '',
        category: '',
        price: '',
        content: '',
        created: '',
      }],
   };
// createSlice : redux store 관리하는데 필요한 slice를 생성
// usestate와 비슷한 역할
const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        clearPost: (state) => { console.log(state); return initialState} ,
    },
    extraReducers: {
        [listPost.fulfilled]: (state, { payload }) => ({
          ...state,
          loading: 'success',
          count: payload.count,
          posts: payload.data.map(post => ({
            id: post._id,
            mainImg: post.mainImg,
            title: post.title,
            category: post.category,
            price: post.price,
            content: post.content,
            created: post.created
          })),
        }),
    }

});
export { listPost };
export default listSlice;
export const { clearPost } = listSlice.actions;
