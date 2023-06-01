import { useEffect } from "react";

import { Button, TextField, Box, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";

import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";

import { FetchResults } from "../utils/Types";

import "../styles/pages/Register.css";
import PasswordInput from "../components/PasswordInput";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

type RegisterResponse = {
    token: string;
    authUserId: string;
};

function Register() {
    const { onChange, onSubmit, values } = useForm<FormValues>(formSubmit, {
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const { loading, error, fetchData, response }: FetchResults =
        useFetch<RegisterResponse>({
            url: "REGISTER",
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
            localStorage.setItem("auth", response.authUserId);

            navigate("/finish-register");
        }
    }, [response, navigate]);

    useEffect(() => {
        const authId = localStorage.getItem("auth");
        if (authId) {
            navigate("/finish-register");
        }
    });

    return (
        <div className="register">
            {loading && <Loader />}

            <main className="register__body">
                <h1>Register</h1>

                <Box
                    className="register__bodyForm"
                    component="form"
                    onSubmit={onSubmit}
                >
                    <FormControl>
                        <TextField
                            label="Email"
                            type="text"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={onChange}
                        />
                    </FormControl>

                    <FormControl>
                        <PasswordInput
                            label="Password"
                            name="password"
                            value={values.password}
                            onChange={onChange}
                        />
                    </FormControl>

                    <FormControl>
                        <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={onChange}
                        />
                    </FormControl>

                    <Button variant="contained" type="submit">
                        Register
                    </Button>
                </Box>
            </main>
            <footer className="register__footer">
                <small>
                    Already have an account? <Link to="/login">Login</Link>
                </small>
            </footer>
        </div>
    );
}

export default Register;
