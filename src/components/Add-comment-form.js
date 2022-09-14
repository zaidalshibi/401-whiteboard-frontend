import axios from "axios";
import React from 'react';


function AddCommentForm ( props ) {
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const comment = {
            'content': e.target.content.value,
        };
        await axios.post(
            `https://whiteboarding-zaid.herokuapp.com/comment/${props.postId}`,
            comment
        ).then( () => {
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