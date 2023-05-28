import { useEffect } from "react";
import { Button, FormControl } from "@mui/material";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";

import { FetchResults } from "utils/Types";

import "../styles/pages/Register.css";
import { Link } from "react-router-dom";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

type RegisterResponse = {
    token: string;
    email: string;
};

function Register() {
    const { onChange, onSubmit, values } = useForm<FormValues>(formSubmit, {
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { loading, error, fetchData, response }: FetchResults =
        useFetch<RegisterResponse>({
            url: "REGISTER",
            method: "POST",
            body: values
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
        <div className="register">
            <h1>Register User</h1>

            <form onSubmit={onSubmit}>
                <FormControl>
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={onChange}
                    />
                </FormControl>

                <FormControl>
                    <label htmlFor="password">Password</label>
                    <input
                        value={values.password}
                        onChange={onChange}
                        type="password"
                        name="password"
                        id="password"
                    />
                </FormControl>

                <FormControl>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={values.confirmPassword}
                        onChange={onChange}
                    />
                </FormControl>

                <Button variant="contained" type="submit">
                    Register
                </Button>

                <footer>
                    <small>
                        Already have an account? <Link to="/login">Login</Link>
                    </small>
                </footer>
            </form>
        </div>
    );
}

export default Register;
