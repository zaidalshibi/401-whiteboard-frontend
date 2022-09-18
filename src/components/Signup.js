import axios from "axios";


function Signup() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.password.value !== e.target.confirmPassword.value) {
            alert('Passwords do not match');
            return;
        } else {
        const user = {
            'username': e.target.username.value,
            'password': e.target.password.value,
            'email': e.target.email.value,
        };
        await axios.post(
            `https://whiteboarding-zaid.herokuapp.com/signup`,
            user
        ).then( (res) => {
            if (res.status === 200) {
                localStorage.setItem('token', true);
                window.location.href = '/posts';
            } 
        }).catch( (err) => {
            alert('Username or email already exists');
        } );
    };
    };
    return ( 
        <div className="signup">
            <h1>Sign up</h1>
            <h2>Please sign in or sign up to see the posts</h2>
            <form onSubmit={handleSubmit}>
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
                    <input type="submit" />
                </div>
            </form>
            <p>Already have an account? <a href="/signin">Sign in now</a></p>
        </div>
    );
}

export default Signup;