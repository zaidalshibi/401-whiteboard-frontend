import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AddCommentForm from "./Add-comment-form";
import React from 'react';
import cookies from 'react-cookies';


function Post ( props ) {
    const [ post, setPost ] = useState( [] );
    const getData = async () => {
        await axios.get( `https://whiteboarding-zaid.herokuapp.com/post` )
            .then( ( res ) => {
                setPost( res.data );
            } ).catch( ( err ) => {
                console.log( err );
            } );

    };

    const handleDelete = async ( id ) => {
        await axios.delete( `https://whiteboarding-zaid.herokuapp.com/post/${id}` );
        getData();
    };

    useEffect( () => {
        getData();
    }, [ props.rerender ] );
    return (
        <>
            {post && post.map( ( post, idx ) => {
                return (
                    <div className="post-class" style={{ justifyContent: 'center', margin: '1rem' }} key={idx}>
                        <img src={post.img} alt={post.title} style={{ width: "15rem" }} />
                        <div className="card-body">
                            <h1 className="card-title">{post.title}</h1>
                            <h3> post by {post.user.username}</h3>
                            <p className="card-text">{post.content}</p>
                        </div>
                        <div>
                            <button onClick={() => {
                                handleDelete( post.id );
                            }}>delete post</button>
                        </div>
                        <div>
                            {post.comments &&
                                <h2>Comments</h2>
                            }
                            {post.comments && post.comments.map( ( comment, idx ) => {
                                return (
                                    <div className="card" style={{ justifyContent: 'center', margin: '1rem' }} key={idx}>
                                        <div className="card-body">
                                            <h3 className="card-title">comment by : {comment.user.username}</h3>
                                            <p className="card-text">{comment.content}</p>
                                        </div>
                                    </div>
                                );
                            }
                            )}
                            <AddCommentForm postId={post.id} getData={getData} />
                        </div>
                        <button className="signout" onClick={() => {
                            cookies.remove( 'token' );
                            cookies.remove( 'user_id' );
                            window.location.replace( '/' );
                        }}>Sign out</button>
                    </div>
                );
            }
            )}
        </>
    );
}
export default Post;