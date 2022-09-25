import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AddCommentForm from "./Add-comment-form";
import React from 'react';
import cookies from 'react-cookies';


function Post ( props ) {
    const [ post, setPost ] = useState( [] );
    const [edit,setEdit] = useState(false)
    const getData = async () => {
        await axios.get( `https://whiteboarding-zaid.herokuapp.com/post`, {
            headers: {
                Authorization: `Bearer ${cookies.load('token')}`
            }
        })
            .then( ( res ) => {
                setPost( res.data );
            } ).catch( ( err ) => {
                console.log( err );
            } );

    };

    const handleDelete = async ( id ) => {
        let confirm = prompt("Please type DELETE");
        if(confirm === "DELETE"){
            await axios.delete( `https://whiteboarding-zaid.herokuapp.com/post/${id}` , {
                headers: {
                    'Authorization': `Bearer ${cookies.load('token')}`
                }
            } );
            getData();
        } else handleDelete()
    };

    const handleEditForm = async (e,id) => {
        e.preventDefault()
        let title = e.target.title.value
        let content = e.target.content.value
        let obj = {
            title,
            content
        }
        await axios.put( `https://whiteboarding-zaid.herokuapp.com/post/${id}`, obj , {
            headers: {
                'Authorization': `Bearer ${cookies.load('token')}`
            }
        } )
        setEdit(false);
        getData();
    }

    useEffect( () => {
        getData();
    }, [ props.rerender ] );
    return (
        <>  {!post && <h1>No posts right now</h1>}
            {post && post.map( ( post, idx ) => {
                return (
                    <div className="post-class" style={{ justifyContent: 'center', margin: '1rem' }} key={idx}>
                        <img src={post.img} alt={post.title} style={{ width: "15rem" }} />
                        <div className="card-body">
                            <h1 className="card-title">{post.title}</h1>
                            <h3> post by {post.user.username}</h3>
                            <p className="card-text">{post.content}</p>
                        </div>
                        {cookies.load('role')=== 'admin' ? 
                        <div>
                            <button onClick={() => {
                                handleDelete( post.id );
                            }}>delete post</button>
                            <button onClick={() => {
                                setEdit(true) ;
                            }}>Edit post</button>
                    {edit && 
                    <form onSubmit={(e) => handleEditForm(e,post.id)}>
                        <h3>edit post</h3>
                        <label htmlFor="title">New Title</label>
                        <input type="text" name="title" id="title" />
                        <label htmlFor="content">New Content</label>
                        <input type="text" name="content" id="content" />
                        <input type="submit" value="submit" />
                    </form>}
                        </div>
                    : null}
                        <div>
                            {!post.comments && <h1>No comments right now</h1>}
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
                            cookies.remove('username');
                            cookies.remove('role');
                            window.location.href = '/'
                        }}>Sign out {cookies.load('username')}</button>
                    </div>
                );
            }
            )}
        </>
    );
}
export default Post;