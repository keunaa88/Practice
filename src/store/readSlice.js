
import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import contentApi from "api/contentApi";

// 액션 생성자 함수 생성
const readPostAction = createAction('read/readPost');

//비동기 작업을 위한 createAsyncThunk
const readPost = createAsyncThunk(readPostAction, async (id, thunkAPI) => {

  const { data } = await contentApi.contentRead(id);
  return {...data};
  // if(id) {
  //   const { data } = await contentApi.contentRead(id);
  //   return {...data};
  // } else {
  //   const { data } = await contentApi.contentReadAll();
  //   console.log('readPost' , data);
  //   return [...data];
  // }
});

const initialState = {
      loading: 'idle',
      post: {
        id: '',
        mainImg: '',
        title: '',
        category: '',
        price: '',
        content: '',
        created: '',
      },
      insertedId: '',
      error: null,
   };
// createSlice : redux store 관리하는데 필요한 slice를 생성
// usestate와 비슷한 역할
const readSlice = createSlice({
    name: 'read',
    initialState,
    reducers: {
        clearPost: (state) => { console.log(state); return initialState} ,
    },
    extraReducers: {
        [readPost.pending]: (state) => ({
          ...state,
          loading: 'pending',
        }),
        [readPost.fulfilled]: (state, { payload }) => ({
          ...state,
          loading: 'success',
          insertedId: payload.insertedId,
          post: {
            id: payload._id,
            mainImg: payload.mainImg,
            title: payload.title,
            category: payload.category,
            price: payload.price,
            content: payload.content,
            created: payload.created
          },
        }),
        [readPost.rejected]: (state, { payload }) => ({
          ...state,
          loading: 'failed',
          error: payload.error
        }),
    }

});
export { readPost };
export default readSlice;
export const { clearPost } = readSlice.actions;

