// import axios from "axios";
// import base64 from "base-64";
// import  cookies  from "react-cookies";
import { useUser } from "../Context/UserContext";

function Signin () {
    const { handleSignIn } = useUser();

    return (
        <div className="signin">
            <h1>Sign in</h1>
            <h2>Please sign in or sign up to see the posts</h2>
            <form onSubmit={( e ) => handleSignIn( e )}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="form-control">
                    <input type="submit" />
                </div>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up now</a></p>
        </div>
    );
}

export default Signin;