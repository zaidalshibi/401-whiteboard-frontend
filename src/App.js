import React, { useCallback } from 'react';
import { Else, If, Then } from "react-if";
import AddPostForm from "./components/Post/Add-post-form";
import Post from "./components/Post/Post";
import Signin from "./components/Auth/Signin";
import './App.css';
import { Button, useColorMode, VStack } from '@chakra-ui/react';
import { useAuthSelector } from './index';
import { useEffect } from 'react';

function App () {
  const isAuth = useAuthSelector( state => state.auth.isAuth );
  const checkAuth = useCallback(() => {
    if ( isAuth ) {
      return true
    } else if ( !isAuth && localStorage.getItem( 'isAuth' ) === 'true' ) {
      return true
    } else {
      return false
    }
  }, [ isAuth ] );
  useEffect( () => {
    checkAuth();
  }, [checkAuth, isAuth] );
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack>
      <Button
        onClick={toggleColorMode}
        position='fixed'
        top='0'
        right='0'
        m={4}
        bg={colorMode === "light" ? "modeButton.900" : "modeButton.100"}
        color={colorMode === "light" ? "modeButton.100" : "modeButton.900"}
        _hover={{ bg: colorMode === "light" ? "modeButtonHover.900" : "modeButtonHover.100" }}
      >
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <If condition={checkAuth()}>
        <Then>
          <AddPostForm />
          <Post />
        </Then>
        <Else>
          <Signin />
        </Else>
      </If>
    </VStack>
  );
}

export default App;
