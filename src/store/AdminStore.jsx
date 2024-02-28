// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './slice/AdminAuthSlice.jsx';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key:'adminroot',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig,authReducer);


// export const Adminstore =configureStore({
//     reducer:{
//         auth:persistedReducer
//     }
// })

// export const Adminpersistor = persistStore(Adminstore)
// import { configureStore } from "@reduxjs/toolkit";
// import adminAuthReducer from './slice/AdminAuthSlice'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

// const persistConfigAdmin = {
//   key: 'adminroot',
//   storage,
// };

// const persistedReducerAdmin = persistReducer(persistConfigAdmin, adminAuthReducer);

// export const Adminstore = configureStore({
//   reducer: {
//     auth: persistedReducerAdmin,
//   },
// });

// export const Adminpersistor = persistStore(Adminstore);
// AdminStore.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminAuthReducer from '../store/slice/AdminAuthSlice';

const persistConfigAdmin = {
  key: 'adminroot',
  storage,
};

const persistedReducerAdmin = persistReducer(persistConfigAdmin, adminAuthReducer);

export const adminStore = configureStore({
  reducer: {
    adminAuth: persistedReducerAdmin,
    // Add other admin slices here if needed
  },
});

export const adminPersistor = persistStore(adminStore);
