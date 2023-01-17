import React from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Link, Routes, BrowserRouter as Router, useNavigate} from 'react-router-dom' 
import './App.css';
import Bank from './pages/Bank';
import Browser from './pages/Browser';
import Home from './pages/Home';
import QrCode from './pages/QrCode';
import Statement from './pages/Statement';
import RequireAuth from './RequireAuth';

function App() {
  return (

    <Router>
    <div className="App">
    
    <Routes>
      
          <Route exact path ='/' element={<RequireAuth> < Home /></RequireAuth>}></Route>
          <Route exact path ='/banks' element={<RequireAuth>< Bank /></RequireAuth>}></Route>
          <Route exact path ='/statements' element={<RequireAuth>< Statement /></RequireAuth>}></Route>
          <Route exact path ='/qrcode' element={isMobile ? <QrCode /> : <Browser text="Only allowed in Mobile"/>}></Route>

          
   </Routes>
   </div>
   </Router>

  );
}

export default App;
