import AddPostForm from "./components/Add-post-form";
import Post from "./components/Post";
import './App.css';
import { useState } from "react";
import React from 'react';


function App() {
  const [rerender, setRerender] = useState(false);
  const handleRerender = () => {
    setRerender(!rerender);
  };
  return (
    <div className="App">
        <AddPostForm getData={handleRerender}/>
        <Post rerender={rerender}/>
    </div>
  );
}

export default App;
