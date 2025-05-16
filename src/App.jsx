import './App.css'
import React from 'react'
import {Routes, Route } from 'react-router-dom';
import ProgressStatus from './Components/ProgressStatus/ProgressStatus';
import { Home } from './pages/Home/Home';
import { TemplatePage } from './pages/SelectTemplate/SelectTemplate'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (
    <>
      <div>
        <div>
            <Routes>
                  <Route exact path='/' element={<Home/>}></Route>
                  <Route exact path='/templates' element={<TemplatePage/>}></Route>
                  <Route path="/progress/*" element ={<ProgressStatus />}></Route> 
            </Routes> 
        </div>
    </div>
    </>
  )
}

export default App
