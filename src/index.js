import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route exact path='/signin' element={<Signin />} />
      <Route exact path='/signup' element={<Signup />} />
      {localStorage.getItem('token') ? <Route exact path='/posts' element={<App />} /> : <Route exact path='/posts' element={<Signin />} />}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
