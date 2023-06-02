import { useEffect, useState } from "react";

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
    const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);
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
        if (!isPasswordsEqual) {
            return;
        }
        fetchData();
    }

    useEffect(() => {
        if (values.password !== values.confirmPassword) {
            setIsPasswordsEqual(false);
        } else {
            setIsPasswordsEqual(true);
        }
    }, [values.password, values.confirmPassword]);

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

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

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
                    {(error && (
                        <p
                            style={{ color: "red", width: "250px" }}
                            className="error"
                        >
                            {error?.message}
                        </p>
                    )) || <></>}

                    <FormControl>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            id="email"
                            required
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
                            id="password"
                        />
                    </FormControl>

                    <FormControl>
                        <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                            error={!isPasswordsEqual}
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
