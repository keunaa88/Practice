import {createSlice} from '@reduxjs/toolkit'

//why redux? passing state between components easily
let user = createSlice({  //useState()와 비슷한 역할
    name : 'user',
    initialState : {name: 'kim', age: 20},
    // how to modify?
    reducers : {
        changeName(state) {
            state.name ='park'
            return state;
        },
        changeAge(state, action) {
            state.age += action.payload;
            return state;
        },       
    }
});

export let {changeName, changeAge} = user.actions

export default user;