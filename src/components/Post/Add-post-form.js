import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useUserData } from "../../Context/UserDataContext";

function AddPostForm () {
    const { user, clearUser, setIsAuth } = useAuth();
    const { addPost } = useUserData();
    return (
        <>
            <div className="add-post-form">
                <h2>Add Post</h2>
                <form onSubmit={( e ) => addPost( e )}>
                    <div className="form-control">
                        <label>Title</label>
                        <input type="text" placeholder="Add Title" name="title" />
                    </div>
                    <div className="form-control">
                        <label>Content</label>
                        <textarea placeholder="Add Post content" name="content"></textarea>
                    </div>
                    <div className="form-control">
                        <label>Add Image</label>
                        <input type='text' placeholder="Add Image address" name="img"></input>
                    </div>
                    <div className="form-control">
                        <input type="submit" />
                    </div>
                </form>
                <button className="signout" onClick={() => {
                    clearUser();
                    setIsAuth( false );
                }}>Sign out {user.username}</button>
            </div>
        </>
    );
}

export default AddPostForm;