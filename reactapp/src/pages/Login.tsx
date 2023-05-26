import { useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { FetchResults } from "../utils/Types";
import useFetch from "../hooks/useFetch";

import "../styles/pages/Login.css";

type FormValues = {
    email: string;
    password: string;
};

function Login() {
    const { onChange, onSubmit, values } = useForm<FormValues>(formSubmit, {
        email: "",
        password: "",
    });

    const { loading, error, fetchData, response }: FetchResults = useFetch({
        url: "LOGIN",
        method: "POST",
        body: values,
    });

    function formSubmit() {
        fetchData();

        console.log("Form submitted", values);
    }

    useEffect(() => {
        if (response) {
            console.log("Response", response);
        }
    }, [response]);

    return (
        <div className="login">
            <main className="login__body">
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
