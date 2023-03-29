// redux store 
import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// //why redux? passing state between components easily
// let user = createSlice({  //useState()와 비슷한 역할
//     name : 'user',
//     initialState : {name: 'kim', age: 20},
//     // how to modify?
//     reducers : {
//         changeName(state) {
//             state.name ='park'
//             return state;
//         },
//         changeAge(state, action) {
//             state.age += action.payload;
//             return state;
//         },
       
//     }
// });

// how to modify?
// 1. createSlice에 reducer에 함수 추가
// 2. 함수들을 export 시켜줌
// 3. 사용할 곳에 가서 import 시키고, dispatch추가 dispatch(state변경함수);
// use의 함수들 
//export let {changeName, changeAge} = user.actions

let stock = createSlice({  //useState()와 비슷한 역할
    name : 'stock',
    initialState : [10, 20, 30]
});

let animal = createSlice({  //useState()와 비슷한 역할
    name : 'animal',
    initialState : 'rabbit'
});

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id: 0, name : 'White and Black', count : 2},
        {id: 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, action){
            // state.map(item => {
            //     item.count = item.id === action.payload ? item.count + 1 : item.count;
            // });
            //let ddd = state.findIndex((item) => { return item.id === action.payload})
            //console.log(ddd)
            // 1. find index사용
            let index = state.findIndex(item=> item.id === action.payload);
            state[index].count ++;
            // 2. find 사용
            // let item = state.find(item=> item.id === action.payload);
            // item.count++;
        },
        subCount(state, action) {
            let index = state.findIndex(item=> item.id === action.payload);
            if(state[index].count === 1){
                state.splice(index, 1);
            } else { 
                state[index].count --;
            }
        },
        addItem(state, action) {

            let index = state.findIndex(item=> item.id === action.payload.id);
            if(index === -1) {
               state = [...state, action.payload]
            } else {
                state[index].count++;
            }
                    
            //state.push(action.payload);
            console.log(state)
            return state
        }
    }
});

export let {changeCount, subCount, addItem} = cart.actions


export default configureStore ({
    reducer: {
        user : user.reducer,
        animal : animal.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})