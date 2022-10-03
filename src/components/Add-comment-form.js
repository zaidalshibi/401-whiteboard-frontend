import axios from "axios";
import React from 'react';
import { useUser } from "../Context/UserContext";


function AddCommentForm ( props ) {
    const { user } = useUser();
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const comment = {
            'content': e.target.content.value,
        };
        await axios.post(
            `https://whiteboarding-zaid.herokuapp.com/comment/${props.postId}/${user.user_id}`,
            comment
        ).then( () => {
            console.log( 'comment added' );
            props.getData();
        } );
    };
    return (
        <>
            <div className="add-comment-form">
                <h2>Add Comment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <textarea placeholder="Add Comment content" name="content"></textarea>
                    </div>
                    <div className="form-control">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCommentForm;