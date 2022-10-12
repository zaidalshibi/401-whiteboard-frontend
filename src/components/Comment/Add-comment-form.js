import React from 'react';
import { useAuth } from "../../Context/AuthContext";
import { useUserData } from "../../Context/UserDataContext";


function AddCommentForm ( props ) {
    const { handleSignOut } = useAuth();
    const { addComment } = useUserData();
    return (
        <>
            <div className="add-comment-form">
                <h2>Add Comment</h2>
                <form
                    onSubmit={( e ) => addComment( e, props.postId )}
                >
                    <div className="form-control">
                        <textarea placeholder="Add Comment content" name="content"></textarea>
                    </div>
                    <div className="form-control">
                        <input type="submit" />
                    </div>
                </form>
                <button
                    className="signout"
                    onClick={() => { handleSignOut(); }}
                >
                    Sign out {JSON.parse( localStorage.getItem( 'username' ) )}
                </button>
            </div>
        </>
    );
}

export default AddCommentForm;