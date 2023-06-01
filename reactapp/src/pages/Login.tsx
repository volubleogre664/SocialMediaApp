import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/stateHooks";
import { FetchResults, UserState } from "../utils/Types";

import Connector from "../signalr-connection";

import "../styles/pages/Login.css";
type FormValues = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
    user: UserState;
};

function Login() {
    const { dispatch } = useUser();
    const navigate = useNavigate();
    const { onChange, onSubmit, values } = useForm<FormValues>(formSubmit, {
        email: "",
        password: "",
    });

    const { loading, error, fetchData, response }: FetchResults =
        useFetch<LoginResponse>({
            url: "LOGIN",
            query: "",
            method: "POST",
            body: values,
        });

    function formSubmit() {
        fetchData();
    }

    useEffect(() => {
        if (response) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("auth", response.user.authUserId);

            dispatch({
                type: "setUser",
                payload: response.user,
            });
            const { newMessage, events, JoinGroup } = Connector();
            navigate("/user-profile");
        }
    }, [response, dispatch, navigate]);

    return (
        <div className="login">
            <main className="login__body">
                {loading && <Loader />}
                <h1>Login</h1>

                <form onSubmit={onSubmit}>
                    <div className="login__form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={onChange}
                            value={values.email}
                            type="text"
                            name="email"
                            id="email"
                        />
                    </div>

                    <div className="login__form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={onChange}
                            value={values.password}
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>
            </main>

            <footer className="login__footer">
                <small>
                    Already have an account? <Link to="/login">Login</Link>
                </small>
            </footer>
        </div>
    );
}

export default Login;
