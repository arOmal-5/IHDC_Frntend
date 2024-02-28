// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slice/AuthSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key:'userroot',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig,authReducer);


// export const store =configureStore({
//     reducer:{
//         auth:persistedReducer
//     }
// })

// export const persistor = persistStore(store)
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slice/AuthSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

// const persistConfigUser = {
//   key: 'userroot', 
//   storage,
// };

// const persistedReducerUser = persistReducer(persistConfigUser, authReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistedReducerUser,
//   },
// });

// export const persistor = persistStore(store);
// UserStore.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import userAuthReducer from './UserAuthSlice';
import userAuthReducer from '../store/slice/AuthSlice'

const persistConfigUser = {
  key: 'userroot',
  storage,
};

const persistedReducerUser = persistReducer(persistConfigUser, userAuthReducer);

export const userStore = configureStore({
  reducer: {
    userAuth: persistedReducerUser,
    // Add other user slices here if needed
  },
});

export const userPersistor = persistStore(userStore);
