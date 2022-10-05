import AddPostForm from "./components/Post/Add-post-form";
import Post from "./components/Post/Post";
import './App.css';
import React, { useEffect } from 'react';
import { Else, If, Then, When } from "react-if";
import { useAuth } from "./Context/AuthContext";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";


function App () {
  const { isAuth, signup, checkSignIn } = useAuth();
  useEffect( () => {
    checkSignIn();
  }, [] );
  return (
    <div className="App">
      <When condition={isAuth}>
        <AddPostForm />
        <Post />
      </When>
      <When condition={!isAuth}>
        <If condition={signup}>
          <Then>
            <Signup />
          </Then>
          <Else>
            <Signin />
          </Else>
        </If>
      </When>
    </div>
  );
}

export default App;
