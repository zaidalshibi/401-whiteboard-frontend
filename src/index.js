import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import myTheme from './theme/index';
import { createDispatchHook, createSelectorHook, Provider } from 'react-redux';
import { store } from './AuthRedux/store';
import { store as userStore } from './UserRedux/store';

const authContext = React.createContext( store );
const userContext = React.createContext( userStore );
export const useAuthDispatch = createDispatchHook( authContext );
export const useAuthSelector = createSelectorHook( authContext );

export const useUserDispatch = createDispatchHook( userContext );
export const useUserSelector = createSelectorHook( userContext );


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <ChakraProvider theme={myTheme}>
    <Provider store={userStore} context={userContext}>
      <Provider store={store} context={authContext}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Provider>
  </ChakraProvider>
);
