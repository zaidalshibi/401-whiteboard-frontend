import { actionType } from "../config/constants";
import cookies from "react-cookies";
import axios from "axios";


export const getData = ( dispatch ) => {
    try {
        axios.get( `${process.env.REACT_APP_SERVER_URL}/post`, {
            headers: {
                Authorization: `Bearer ${cookies.load( 'token' )}`
            }
        } )
            .then( ( res ) => {
                dispatch( { type: actionType.FETCH_DATA, payload: res.data } );
            } ).catch( ( err ) => {
                console.log( err );
            } );
    }
    catch ( error ) {
        console.log( error );
    }
};

export const addPostAction = (dispatch, payload ) => {
    try {
    axios.post(
        `${process.env.REACT_APP_SERVER_URL}/post`,
        payload, {
        headers: {
            'Authorization': `bearer ${cookies.load( 'token' )}`
        }
    }
    ).then( (res) => {
        console.log( 'post added' );
        dispatch( { type: actionType.ADD_POST, payload: res.data } );
    } );
    }
    catch ( error ) {
        console.log( error );
    }
};

export const showEdit = ( dispatch, payload ) => {
    dispatch( { type: actionType.SHOW_EDIT, payload: payload } );
}

export const editPostAction = ( dispatch, payload ) => {
    try {
        axios.put( `${process.env.REACT_APP_SERVER_URL}/post/${payload.id}/${localStorage.getItem( 'user_id' )}`, payload.post, {
            headers: {
                'Authorization': `Bearer ${cookies.load( 'token' )}`
            }
        } ).then( ( res ) => {
            console.log( 'post edited' );
            dispatch( { type: actionType.EDIT_POST, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
}

export const deletePostAction = ( dispatch, payload ) => {
    try {
        axios.delete( `${process.env.REACT_APP_SERVER_URL}/post/${payload}/${localStorage.getItem( 'user_id' )}`, {
            headers: {
                'Authorization': `Bearer ${cookies.load( 'token' )}`
            }
        } ).then( ( res ) => {
            console.log( 'post deleted' );
            dispatch( { type: actionType.DELETE_POST, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
}

export const addCommentAction = ( dispatch, payload ) => {
    try {
        axios.post( `${process.env.REACT_APP_SERVER_URL}/comment/${payload.postId}/${localStorage.getItem( 'user_id' )}`, payload.comment
        )
        .then( ( res ) => {
            console.log( 'comment added' );
            dispatch( { type: actionType.ADD_COMMENT, payload: res.data } );
        } )
        .catch( ( err ) => {
            console.log( err );
        })
    }
    catch ( error ) {
        console.log( error );
    }
}