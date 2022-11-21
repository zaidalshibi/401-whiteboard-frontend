import base64 from "base-64";
import axios from "axios";
import cookies from "react-cookies";
import { loginSuccess, loginFailure, logout, signupSuccess, signupFailure } from "../Redux/slicer";

export const loginAction = async ( payload, dispatch ) => {
    payload.preventDefault();
    try {
        const encoded = base64.encode( `${payload.target[ 0 ].value}:${payload.target[ 1 ].value}` );
        await axios.post( `${process.env.REACT_APP_SERVER_URL}/signin`,
            {},
            {
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            }
        ).then( ( res ) => {
            if ( res.status === 200 ) {
                cookies.save( 'token', res.data.token );
                localStorage.setItem( 'username', JSON.stringify( res.data.user.username ) );
                localStorage.setItem( 'user_id', JSON.stringify( res.data.user.id ) );
                localStorage.setItem( 'role', JSON.stringify( res.data.user.role ) );
                localStorage.setItem( 'capabilities', JSON.stringify( res.data.user.capabilities ) );
                localStorage.setItem( 'isAuth', JSON.stringify( true ) );
                const obj = { user: res.data.user, token: res.data.token };
                dispatch( loginSuccess( obj ) );
            }
        }
        ).catch( ( err ) => {
            localStorage.clear();
            localStorage.setItem( 'isAuth', JSON.stringify( false ) );
            dispatch( loginFailure( err ) );

        }
        );
    }
    catch ( error ) {
        localStorage.clear();
        localStorage.setItem( 'isAuth', JSON.stringify( false ) );
        const obj = { isAuthor: false, user: {}, token: '' };
        console.log( "obj from action catch2", obj );

    }
};

export const logoutAction = ( dispatch ) => {
    localStorage.clear();
    cookies.remove( 'token' );
    localStorage.setItem( "isAuth", JSON.stringify( false ) );
    dispatch( logout() );
};

export const signupAction = ( payload, dispatch ) => {
    console.log( "payload from signupAction", payload );
    payload.preventDefault();
    try {
        axios.post( `${process.env.REACT_APP_SERVER_URL}/signup`, {
            username: payload.target[ 0 ].value,
            password: payload.target[ 1 ].value,
            email: payload.target[ 3 ].value,
            role: payload.target[ 4 ].value,
        } ).then( ( res ) => {
            if ( res.status === 200 ) {
                cookies.save( 'token', res.data.token );
                localStorage.setItem( 'username', JSON.stringify( res.data.user.username ) );
                localStorage.setItem( 'user_id', JSON.stringify( res.data.user.id ) );
                localStorage.setItem( 'role', JSON.stringify( res.data.user.role ) );
                localStorage.setItem( 'capabilities', JSON.stringify( res.data.user.capabilities ) );
                localStorage.setItem( 'isAuth', JSON.stringify( true ) );
                const obj = { user: res.data.user, token: res.data.token };
                console.log( "obj from action", obj );
                dispatch( signupSuccess( obj ) );
                window.history.back();
            }
        } ).catch( ( err ) => {
            localStorage.clear();
            localStorage.setItem( 'isAuth', JSON.stringify( false ) );
            dispatch( signupFailure( err ) );
        } );
    }
    catch ( error ) {
        localStorage.clear();
        localStorage.setItem( 'isAuth', JSON.stringify( false ) );
        dispatch( signupFailure( error ) );
    }
};

const authObj = {
    username: JSON.parse( localStorage.getItem( 'username' ) ),
    token: cookies.load( 'token' ),
    user_id: JSON.parse( localStorage.getItem( 'user_id' ) ),
    role: JSON.parse( localStorage.getItem( 'role' ) ),
    capabilities: JSON.parse( localStorage.getItem( 'capabilities' ) ) ? JSON.parse( localStorage.getItem( 'capabilities' ) ) : [],
    isAuth: JSON.parse( localStorage.getItem( 'isAuth' ) ) ? JSON.parse( localStorage.getItem( 'isAuth' ) ) : false,
};

export const canDo = ( role, postId ) => {
    if ( authObj.capabilities.includes( role ) || parseInt( authObj.user_id ) === postId ) {
        return true;
    } else {
        return false;
    }
};