import { useUser } from "../Context/UserContext";

function Signup () {
    const { handleSignUp } = useUser();

    return (
        <div className="signup">
            <h1>Sign up</h1>
            <h2>Please sign in or sign up to see the posts</h2>
            <form onSubmit={( e ) => handleSignUp( e )}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="text" name="confirmPassword" id="confirmPassword" />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="role">Role</label>
                    <select name="role">
                        <option value="user" selected>USER</option>
                        <option value="admin">ADMIN</option>
                    </select>
                </div>
                <div className="form-control">
                    <input type="submit" />
                </div>
            </form>
            <p>Already have an account? <a href="/signin">Sign in now</a></p>
        </div>
    );
}

export default Signup;