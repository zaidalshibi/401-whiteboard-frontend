import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './Context/AuthContext';
import UserDataContextProvider from './Context/UserDataContext';
import Signup from './components/Auth/Signup';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <AuthContextProvider>
    <UserDataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserDataContextProvider>
  </AuthContextProvider>
);
