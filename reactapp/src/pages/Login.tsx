import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Loader from "../components/Loader";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/stateHooks";
import { FetchResults, UserState } from "../utils/Types";
import PasswordInput from "../components/PasswordInput";

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

            dispatch({
                type: "setUser",
                payload: response.user,
            });
            const { newMessage, events, JoinGroup } = Connector();
            navigate("/user-profile");
        }
    }, [response, dispatch, navigate]);

    useEffect(() => {
        const authId = localStorage.getItem("auth");
        if (authId) {
            navigate("/finish-register");
        }
    });

    return (
        <div className="login">
            <main className="login__body">
                {loading && <Loader />}
                <h1>Login</h1>

                <Box
                    className="login__bodyForm"
                    component="form"
                    onSubmit={onSubmit}
                >
                    <div className="login__form-control">
                        <TextField
                            name="email"
                            label="Email"
                            type="text"
                            id="text"
                            onChange={onChange}
                            value={values.email}
                        />
                    </div>

                    <div className="login__form-control">
                        <PasswordInput
                            name="password"
                            label="Password"
                            onChange={onChange}
                            value={values.password}
                        />
                    </div>

                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Box>
            </main>

            <footer className="login__footer">
                <small>
                    Already have an account?{" "}
                    <Link to="/register">Register</Link>
                </small>
            </footer>
        </div>
    );
}

export default Login;
