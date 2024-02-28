import { Routes, Route } from 'react-router-dom';
import AdminRouter from './routes/AdminRouter/AdminRouter';
import SuperAdminRouter from './routes/superAdminRouter/SuperAdminRouter';
import HomePage from './page/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage/>}/> 

        <Route path='/user/*' element={<AdminRouter/>}/>
        <Route path='/dash/*' element={<SuperAdminRouter/>}/>
      </Routes>

    </div>
  );
}

export default App;