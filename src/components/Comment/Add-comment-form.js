import React from 'react';
import { useAuth } from "../../Context/AuthContext";
import { useUserData } from "../../Context/UserDataContext";


function AddCommentForm ( props ) {
    const { user, clearUser, setIsAuth } = useAuth();
    const { addComment } = useUserData();
    return (
        <>
            <div className="add-comment-form">
                <h2>Add Comment</h2>
                <form onSubmit={(e, postId) => addComment(e, props.postId)}>
                    <div className="form-control">
                        <textarea placeholder="Add Comment content" name="content"></textarea>
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

export default AddCommentForm;