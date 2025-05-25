import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProgressStatus from './Components/ProgressStatus/ProgressStatus';
import ResumeSaver from './Components/DetailsFillComponents/ResumeSaver/ResumeSaver';
import { Home } from './pages/Home/Home';
import { TemplatePage } from './pages/SelectTemplate/SelectTemplate';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NotFound from './pages/NotFound/Not-Found'

const App = () => {


  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Signup />} />
        <Route exact path='/templates' element={<TemplatePage />}>
          <Route path='resume' element={<ResumeSaver />} />
        </Route>
        <Route path='/progress/*' element={<ProgressStatus />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
