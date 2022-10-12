import { useEffect } from "react";
import AddCommentForm from "../Comment/Add-comment-form";
import React from 'react';
import { useAuth } from "../../Context/AuthContext";
import { useUserData } from "../../Context/UserDataContext";
import Comments from "../Comment/Comments";
import EditPostForm from "./editPostForm";



function Post () {
    const { canDo } = useAuth();
    const { fetchData, deletePost, postObj, showEditForm } = useUserData();

    useEffect( () => {  
        fetchData();
    }, [postObj.reRender, postObj.edit] );
    return (
        <>
            {postObj.posts ? postObj.posts.map( ( post, idx ) => {
                return (
                    <div className="post-class" style={{ justifyContent: 'center', margin: '1rem' }} key={idx}>
                        <div>
                            <img src={post.img} alt={post.title} style={{ width: "15rem" }} />
                            <div className="card-body">
                                <h1 className="card-title">{post.title}</h1>
                                <p className="card-text">{post.content}</p>
                                <h3> post by {post.user.username}</h3>
                            </div>
                        </div>
                        <div>
                            {canDo( 'update', post.user.id ) === true ?
                                <button onClick={() => {
                                    showEditForm()
                                }}>Edit post</button>
                                : null}
                            {canDo( 'delete', post.user.id ) === true ?
                                <button onClick={() => {
                                    deletePost( post.id );
                                }}>delete post</button>
                                : null}
                            {postObj.showEdit &&
                                <EditPostForm id={post.id} />
                            }
                        </div>
                        <div>
                            {!post.comments && <h1>No comments right now</h1>}
                            {post.comments &&
                                <h2>Comments</h2>
                            }
                            {post.comments && post.comments.map( ( comment, idx ) => {
                                return (
                                    <Comments comment={comment} key={idx} idx={idx} />
                                );
                            } )}
                            <AddCommentForm postId={post.id} />
                        </div>
                    </div>
                );
            } ) : <h1>No posts right now</h1>}
        </>
    );
}
export default Post;