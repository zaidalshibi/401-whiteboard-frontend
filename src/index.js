import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Auth/Signin';
import cookies from 'react-cookies';
import AuthContextProvider from './Context/AuthContext';
import UserDataContextProvider from './Context/UserDataContext';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <AuthContextProvider>
    <UserDataContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {cookies.load( 'token' ) ? <Route path='/posts' element={<App />} /> : <Route path='/posts' element={<Signin />} />}
      </Routes>
    </BrowserRouter>
    </UserDataContextProvider>
  </AuthContextProvider>
);
