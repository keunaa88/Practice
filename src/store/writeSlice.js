

import { createSlice } from "@reduxjs/toolkit";


// const initialState = 
//                 {
//                     image: null,
//                     title: '',
//                     category: 'top',
//                     price: '',
//                     content: '',
//                     errorMessage: {image: '', title: '', price: ''}
//                 };
// // for test
const initialState = 
                {
                    image: 'http://localhost:3000/835cdfe3-4730-4f63-b392-da18e6a7f066',
                    title: 'title_test',
                    category: 'top',
                    price: '3000',
                    content: '',
                    errorMessage: {image: '', title: '', price: ''}
                };

// createSlice : redux store 관리하는데 필요한 slice를 생성
// usestate와 비슷한 역할
const writeSlice = createSlice({
    name: 'write',
    initialState ,
    reducers: {
        // changeField : (state, action) =>  (
        //     console.log(state, ' & ', action)
        // ),

        // state복사 
        // [age] : 30 // age라는 키에 30을 넣는다는것 
        changeField: (state, { payload: { key, value } }) => ({
                ...state,
                [key]: value,
        }),
        // uploadImage: {
        //     reducer: (state, { payload: { key, value } }) => ({
        //         ...state,
        //         [key] : value
        //     }),
        // },
        changeContentImages : (state, { payload : image } ) => ({
            ...state,
            contentImages: [...state.contentImages, image]
        }),
        changeImage: (state, { payload : image } ) => ({
                ...state,
                image : image
         }),

        setPostData: (state, { payload: write }) => ({
            ...state,
            image: write.image,
            category: write.category,
            title: write.title,
            price: write.price,
        }),

        setErrorMessage : (state, { payload: { key, value } }) => ({ //action.payload
            ...state,
            errorMessage: {
                ...state.errorMessage,
                [key]: value,
            }
        }),

        clearField: (state) => initialState,
    }
});

export default writeSlice;
export const { changeContent, changeField, changeImage, changeContentImages, clearField, setErrorMessage } = writeSlice.actions;