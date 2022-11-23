import cookies from "react-cookies";
import axios from "axios";
import { addComment, addPost, deletePost, editPost, fetchPosts, fetchPostsFailure, showEdit } from "../UserRedux/slicer";


export const getData = ( dispatch ) => {
    try {
        let token = cookies.load( "token" );
        if ( token !== undefined || token !== null || token !== "" ) {
            axios.get( `${process.env.REACT_APP_SERVER_URL}/post`,
                // {}, 
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InphaWRhbHNoaWJpIiwiaWF0IjoxNjY5MDYxNTcyfQ.wIiAqU6raJ1mD3E9KxFua1366Ej9INvjKp35Jnwz0ok`
                    }
                } )
                .then( ( res ) => {
                    dispatch( fetchPosts( res.data ) );
                } ).catch( ( err ) => {
                    console.log( err );
                    dispatch( fetchPostsFailure( err.message ) );
                } );
        } else {
            getData( dispatch );
        }
    }
    catch ( error ) {
        console.log( error );
        dispatch( fetchPostsFailure( error ) );
    }

};

export const addPostAction = ( payload, dispatch ) => {
    payload.preventDefault();
    if ( payload.target.img.value === "" ) {
        payload.target.img.value = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png";
    }
    const post = {
        'title': payload.target.title.value,
        'content': payload.target.content.value,
        'img': payload.target.img.value,
        'userID': localStorage.getItem( 'user_id' ),
    };
    try {
        axios.post(
            `${process.env.REACT_APP_SERVER_URL}/post`,
            post, {
            headers: {
                'Authorization': `bearer ${cookies.load( 'token' )}`
            }
        }
        ).then( ( res ) => {
            console.log( 'post added' );
            dispatch( addPost( res.data ) );
            payload.target.title.value = "";
            payload.target.content.value = "";
            payload.target.img.value = "";
            getData( dispatch );
        } );
    }
    catch ( error ) {
        console.log( error );
    }
};

export const showEditAction = ( dispatch, payload ) => {
    dispatch( showEdit( payload ) );
};

export const editPostAction = ( payload, id, dispatch ) => {
    payload.preventDefault();
    let title = payload.target.title.value;
    let content = payload.target.content.value;
    let post = {
        title,
        content,
    };
    try {
        axios.put( `${process.env.REACT_APP_SERVER_URL}/post/${id}/${localStorage.getItem( 'user_id' )}`, post, {
            headers: {
                'Authorization': `Bearer ${cookies.load( 'token' )}`
            }
        } ).then( ( res ) => {
            console.log( 'post edited' );
            dispatch( editPost( res.data ) );
            getData( dispatch );
        } )
            .catch( ( err ) => {
                console.log( err );
            } );
    }
    catch ( error ) {
        console.log( error );
    }
};

export const deletePostAction = ( dispatch, payload ) => {
    let confirm = prompt( "Please type DELETE" );
    if ( confirm === "DELETE" ) {
        try {
            axios.delete( `${process.env.REACT_APP_SERVER_URL}/post/${payload}/${localStorage.getItem( 'user_id' )}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.load( 'token' )}`
                }
            } ).then( ( res ) => {
                console.log( 'post deleted' );
                dispatch( deletePost( payload ) );
                getData( dispatch );
            } )
                .catch( ( err ) => {
                    console.log( err );
                } );
        }
        catch ( error ) {
            console.log( error );
        }
    } else deletePostAction( dispatch, payload );
};

export const addCommentAction = ( payload, postId, dispatch ) => {
    payload.preventDefault();
    const comment = {
        'content': payload.target.content.value,
    };
    try {
        axios.post( `${process.env.REACT_APP_SERVER_URL}/comment/${postId}/${localStorage.getItem( 'user_id' )}`, comment
        )
            .then( ( res ) => {
                console.log( 'comment added' );
                dispatch( addComment( res.data ) );
                getData( dispatch );
                payload.target.content.value = "";
            } )
            .catch( ( err ) => {
                console.log( err );
            } );
    }
    catch ( error ) {
        console.log( error );
    }
};