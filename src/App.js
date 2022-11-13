import React from 'react';
import { useAuth } from "./Context/AuthContext";
import { Else, If, Then } from "react-if";
import AddPostForm from "./components/Post/Add-post-form";
import Post from "./components/Post/Post";
import Signin from "./components/Auth/Signin";
import './App.css';
import { Button, useColorMode, VStack } from '@chakra-ui/react';

function App () {
  const { authObj } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack>
      <Button
        onClick={toggleColorMode}
        position='fixed'
        top='0'
        right='0'
        m={4}
        bg={colorMode === "light" ? "gray.800" : "gray.300"}
        color={colorMode === "light" ? "gray.300" : "gray.800"}
        _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.400" }}
      >
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <If condition={authObj.isAuth}>
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
