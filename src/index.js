import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import myTheme from './theme/index';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <ChakraProvider theme={myTheme}>
    <Provider store={store}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
