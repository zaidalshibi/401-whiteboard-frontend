import { createContext, useContext, useState } from "react";
import React from 'react';
import { addCommentAction, addPostAction, deletePostAction, editPostAction, getData, showEdit } from "../actions/userActions";
import { useReducer } from "react";
import { UserReducer } from "../reducers/userReducer";
import { authData } from "../config/initials";


const UserDataContext = createContext();
export const useUserData = () => useContext( UserDataContext );

const UserDataContextProvider = ( props ) => {
    const [ postObj, dispatch ] = useReducer( UserReducer, { posts: authData.posts, edit: authData.edit } );
    const [ edit, setEdit ] = useState( false );


    const fetchData = () => {
        getData( dispatch );
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
            'userID': localStorage.getItem( 'user_id' ),
        };
        addPostAction( dispatch, post );
        e.target.title.value = "";
        e.target.content.value = "";
        e.target.img.value = "";
    };

    const showEditForm = ( ) => {
        showEdit( dispatch );
    };

    const editPost =  ( e, id ) => {
        e.preventDefault();
        let title = e.target.title.value;
        let content = e.target.content.value;
        let obj = {
            title,
            content,
        };
        editPostAction( dispatch, { id, post: obj } );
        fetchData();
    };

    const deletePost =  ( id ) => {
        let confirm = prompt( "Please type DELETE" );
        if ( confirm === "DELETE" ) {
            deletePostAction( dispatch, id );
            fetchData();
        } else deletePost();
    };

    const addComment =  ( e, postId ) => {
        e.preventDefault();
        const comment = {
            'content': e.target.content.value,
        };
        addCommentAction( dispatch, { postId, comment } )
        e.target.content.value = "";
    };

    return (
        <UserDataContext.Provider value={{ fetchData, deletePost, editPost, postObj, edit, setEdit, addPost, addComment, showEditForm }}>
            {props.children}
        </UserDataContext.Provider>
    );
};

export default UserDataContextProvider;