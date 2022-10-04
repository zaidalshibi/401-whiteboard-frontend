import { createContext, useContext, useState } from "react";
import axios from "axios";
import React from 'react';
import cookies from 'react-cookies';
import { useAuth } from "./AuthContext";


const UserDataContext = createContext();
export const useUserData = () => useContext( UserDataContext );

const UserDataContextProvider = ( props ) => {
    const [ post, setPost ] = useState( [] );
    const [ edit, setEdit ] = useState( false );
    const { user } = useAuth();


    const fetchData = async () => {
        await axios.get( `${process.env.REACT_APP_SERVER_URL}/post`, {
            headers: {
                Authorization: `Bearer ${cookies.load( 'token' )}`
            }
        } )
            .then( ( res ) => {
                setPost( res.data );
            } ).catch( ( err ) => {
                console.log( err );
            } );
    };
    
    const addPost = async ( e ) => {
        e.preventDefault();
        if ( e.target.img.value === "" ) {
            e.target.img.value = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png";
        }
        const post = {
            'title': e.target.title.value,
            'content': e.target.content.value,
            'img': e.target.img.value,
            'userID': user.user_id,
        };
        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/post`,
            post, {
            headers: {
                'Authorization': `bearer ${cookies.load( 'token' )}`
            }
        }
        ).then( () => {
            console.log( 'post added' );
        } );
    };

    const editPost = async ( e, id ) => {
        e.preventDefault();
        let title = e.target.title.value;
        let content = e.target.content.value;
        let obj = {
            title,
            content,
        };
        await axios.put( `${process.env.REACT_APP_SERVER_URL}/post/${id}/${user.user_id}`, obj, {
            headers: {
                'Authorization': `Bearer ${cookies.load( 'token' )}`
            }
        } );
        setEdit( false );
        fetchData();
    };

    const deletePost = async ( id ) => {
        let confirm = prompt( "Please type DELETE" );
        if ( confirm === "DELETE" ) {
            await axios.delete( `${process.env.REACT_APP_SERVER_URL}/post/${id}/${user.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.load( 'token' )}`
                }
            } );
            fetchData();
        } else deletePost();
    };

    const addComment = async ( e, postId ) => {
        e.preventDefault();
        const comment = {
            'content': e.target.content.value,
        };
        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/comment/${postId}/${user.user_id}`,
            comment
        ).then( () => {
            console.log( 'comment added' );
        } );
    };

    return (
        <UserDataContext.Provider value={{fetchData, deletePost, editPost, post, edit, setEdit, addPost, addComment}}>
            {props.children}
        </UserDataContext.Provider>
    );
};

export default UserDataContextProvider;