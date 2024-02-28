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
// export const selectAdminToken=(state)=>state.auth.token;
// export default authSlice.reducer;
// AdminAuthSlice.jsx




// correct one//

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: null,
// };

// const adminAuthSlice = createSlice({
//   name: 'adminAuth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//     },
//   },
// });

// export const { login: adminLogin, logout: adminLogout } = adminAuthSlice.actions;
// export const selectAdminToken = (state) => state.adminAuth.token;
// export default adminAuthSlice.reducer;



//third one//

// adminAuthSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

console.log('admin auth slice');

const initialState = {
  token: null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth', // Correct casing here
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      console.log('action.payload.token', action.payload);
      state.token = action.payload;
    },
    adminLogout: (state) => {
      state.token = null;
    },
  },
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export const selectAdminToken = (state) => state.adminAuth.token; // Correct casing here
export default adminAuthSlice.reducer;


