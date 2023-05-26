import { Link } from "react-router-dom";

import "../styles/pages/Login.css";

function Login() {
    return (
        <div>
            Login
            <footer>
                <small>
                    Already have an account? <Link to="/login">Login</Link>
                </small>
            </footer>
        </div>
    );
}

export default Login;
