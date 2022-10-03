import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import cookies from 'react-cookies';
import UserContextProvider from './Context/UserContext';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        {cookies.load( 'token' ) ? <Route path='/posts' element={<App />} /> : <Route path='/posts' element={<Signin />} />}
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
