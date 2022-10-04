import { createContext, useContext, useState } from "react";
import axios from "axios";
import base64 from "base-64";
import cookies from "react-cookies";


const AuthContext = createContext();
export const useAuth = () => useContext( AuthContext );


const AuthContextProvider = ( props ) => {
    const [ isAuth , setIsAuth ] = useState( false );
    const [ signup , setSignup ] = useState( false );
    let user = {
        username: cookies.load( "username" ),
        user_id: cookies.load( "user_id" ),
        role: cookies.load( "role" ),
        token: cookies.load( "token" ),
    };

    const clearUser = () => {
        cookies.remove( "username" );
        cookies.remove( "token" );
        cookies.remove( "user_id" );
        cookies.remove( "role" );
        setIsAuth( false );
    };
    const handleSignIn = async ( e ) => {
        e.preventDefault();
        const userInput = {
            'username': e.target.username.value,
            'password': e.target.password.value,
        };
        const encoded = base64.encode( `${userInput.username}:${userInput.password}` );
        await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/signin`,
            {},
            {
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            }
        ).then( ( res ) => {
            if ( res.status === 200 ) {
                setIsAuth( false );
                cookies.save( 'token', res.data.token );
                cookies.save( 'username', res.data.user.username );
                cookies.save( 'user_id', res.data.user.id );
                cookies.save( 'role', res.data.user.role );
                setIsAuth( true );
            }
        } ).catch( ( err ) => {
            alert( 'Invalid Login' );
        }
        );
    };

    const handleSignUp = async ( e ) => {
        e.preventDefault();
        if ( e.target.password.value !== e.target.confirmPassword.value ) {
            alert( 'Passwords do not match' );
            return;
        } else {
            const userObject = {
                'username': e.target.username.value,
                'password': e.target.password.value,
                'email': e.target.email.value,
                'role': e.target.role.value
            };
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/signup`,
                userObject
            ).then( ( res ) => {
                if ( res.status === 200 ) {
                    cookies.save( 'token', res.data.token );
                    cookies.save( 'username', res.data.user.username );
                    cookies.save( 'user_id', res.data.user.id );
                    cookies.save( 'role', res.data.user.role );
                    setIsAuth( true );
                }
            } ).catch( ( err ) => {
                alert( 'Username or email already exists' );
            } );
        };
    };

    const checkSignIn = () => {
        if ( cookies.load( 'token' ) ) {
            setIsAuth( true );
        } else {
            setIsAuth( false );
        }
    };
    const value = { user, handleSignIn, handleSignUp, clearUser, isAuth, setIsAuth, signup, setSignup, checkSignIn };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;