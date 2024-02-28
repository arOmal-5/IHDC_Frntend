// import {createSlice} from '@reduxjs/toolkit';

// const initialState={
//     token:null,
// }

// const authSlice=createSlice({
//     name:'auth',
//     initialState,
//     reducers:{
//         login:(state,action)=>{
//             state.token=action.payload
//         },
//         logout:(state)=>{
//             state.token=null
//         }
//     }
// })

// export const {login,logout}=authSlice.actions;
// export const selectUserToken=(state)=>state.auth.token;
// export default authSlice.reducer;

// UserAuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('action.payload.token',action.payload);
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login: userLogin, logout: userLogout } = userAuthSlice.actions;
export const selectUserToken = (state) => state.userAuth.token;
export default userAuthSlice.reducer;
