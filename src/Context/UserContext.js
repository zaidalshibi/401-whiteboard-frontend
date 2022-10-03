import { createContext, useContext } from "react";
import axios from "axios";
import base64 from "base-64";
import cookies from "react-cookies";

const UserContext = createContext();
export const useUser = () => useContext( UserContext );
const UserContextProvider = ( props ) => {
    let user = {
        username: cookies.load( "username" ),
        user_id: cookies.load( "user_id" ),
        role: cookies.load( "role" )
    };

    const clearUser = () => {
        cookies.remove( "username" );
        cookies.remove( "token" );
        cookies.remove( "user_id" );
        cookies.remove( "role" );
    };
    const handleSignIn = async ( e ) => {
        e.preventDefault();
        const userInput = {
            'username': e.target.username.value,
            'password': e.target.password.value,
        };
        const encoded = base64.encode( `${userInput.username}:${userInput.password}` );
        await axios.post(
            `https://whiteboarding-zaid.herokuapp.com/signin`,
            {},
            {
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            }
        ).then( ( res ) => {
            if ( res.status === 200 ) {
                cookies.save( 'token', res.data.token );
                cookies.save( 'username', res.data.user.username );
                cookies.save( 'user_id', res.data.user.id );
                cookies.save( 'role', res.data.user.role );
                window.location.href = "/posts";
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
                `https://whiteboarding-zaid.herokuapp.com/signup`,
                userObject
            ).then( ( res ) => {
                if ( res.status === 200 ) {
                    cookies.save( 'token', res.data.token );
                    cookies.save( 'username', res.data.user.username );
                    cookies.save( 'user_id', res.data.user.id );
                    cookies.save( 'role', res.data.user.role );
                    window.location.href = "/posts";
                }
            } ).catch( ( err ) => {
                alert( 'Username or email already exists' );
            } );
        };
    };
    const value = { user, handleSignIn, handleSignUp, clearUser };
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;