import { createAsyncThunk } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import writeSlice from "./writeSlice";
import readSlice from "./readSlice";
import listSlice from "./listSlice";

//createAsyncThunk는 비동기 작업을 처리하는 액션을 만들어줌
//reducers를 사용하면 toolkit이 aciton creator를 자동으로 만들어 준다. 
//하지만 creatAsyncThunk로 만든 비동기 작업은 action creator를 자동으로 생성하지 못하기 때문에, slice의 extraReducers에 직접 action creator를 정의한다.
// const writePost = createAsyncThunk(
//     createAction('write/writePost'),
//     async({mainImg, title, price, category, content}, thunk
// )


//redux store를 생성하는 코드
const store = configureStore({ 
    reducer: {
        write: writeSlice.reducer,
        read: readSlice.reducer,
        list: listSlice.reducer  // 작명 : slice명.reducer 룰이야 그냥 
    }
  }); 


export default store;