import axios from "axios";
import base64 from "base-64";
import  cookies  from "react-cookies";


function Signin() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            'username': e.target.username.value,
            'password': e.target.password.value,
        };
        const encoded = base64.encode(`${user.username}:${user.password}`);
        await axios.post(
            `https://whiteboarding-zaid.herokuapp.com/signin`,
            {},
            {
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            }
        ).then ( (res) => {
            if (res.status === 200) {
                cookies.save('token', res.data.token);
                cookies.save('user_id', res.data.user.id);
                window.location.href = '/posts';
            }
        } ).catch( (err) => {
            alert('Invalid Login');
        }
        );
    };
    return ( 
        <div className="signin">
            <h1>Sign in</h1>
            <h2>Please sign in or sign up to see the posts</h2>
            <form onSubmit={handleSubmit}>
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