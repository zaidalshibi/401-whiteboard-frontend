import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './Context/AuthContext';
import UserDataContextProvider from './Context/UserDataContext';
import Signup from './components/Auth/Signup';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <ChakraProvider>
    <AuthContextProvider>
      <UserDataContextProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </UserDataContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);
