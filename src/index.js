import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {userStore,userPersistor} from './store/Store';
import { ToastContainer} from 'react-toastify';
import {adminStore,adminPersistor} from './store/AdminStore';
import { PersistGate } from 'redux-persist/integration/react';
import MyProvider from './store/MyProvider'

import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={userStore}>
     <PersistGate loading={null} persistor={userPersistor}>
  <MyProvider>
    <HashRouter>
    <App />
    </HashRouter>
    </MyProvider>
    </PersistGate>
  
  </Provider>
  {/* <Provider store={adminStore}>
  <PersistGate loading={null} persistor={adminPersistor}>

 <BrowserRouter>
 <App />
 </BrowserRouter>
 </PersistGate>

</Provider> */}
<ToastContainer/>
</>

);

















// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { Provider } from 'react-redux';
// import {userStore,userPersistor} from './store/Store';
// import { ToastContainer} from 'react-toastify';
// import {adminStore,adminPersistor} from './store/AdminStore';
// import { PersistGate } from 'redux-persist/integration/react';

// import { HashRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//   <Provider store={userStore}>
//      <PersistGate loading={null} persistor={userPersistor}>
  
//     <HashRouter>
//     <App />
//     </HashRouter>
//     </PersistGate>
  
//   </Provider>
//   {/* <Provider store={adminStore}>
//   <PersistGate loading={null} persistor={adminPersistor}>

//  <BrowserRouter>
//  <App />
//  </BrowserRouter>
//  </PersistGate>

// </Provider> */}
// <ToastContainer/>
// </>
  
// );

