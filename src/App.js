import React from 'react';
import { useAuth } from "./Context/AuthContext";
import { Else, If, Then } from "react-if";
import AddPostForm from "./components/Post/Add-post-form";
import Post from "./components/Post/Post";
import Signin from "./components/Auth/Signin";
import './App.css';

function App () {
  const { authObj } = useAuth();

  return (
    <div className="App">
      <If condition={authObj.isAuth}>
        <Then>
          <AddPostForm />
          <Post />
        </Then>
        <Else>
          <Signin />
        </Else>
      </If>
    </div>
  );
}

export default App;
