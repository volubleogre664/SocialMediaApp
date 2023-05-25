import { Button } from "@mui/material";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";

import { FetchResults } from "../utils/Types";

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

    const { loading, error, fetchData }: FetchResults =
        useFetch<RegisterResponse>({
            url: "REGISTER",
            method: "POST",
            body: {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            },
        });

    function formSubmit(event: any) {
        event.preventDefault();

        fetchData();

        console.log("Form submitted", values);
    }

    return (
        <div className="register">
            <h1>Register User</h1>

            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={values.email}
                    onChange={onChange}
                />
                <br />

                <label htmlFor="password">Password</label>
                <input
                    value={values.password}
                    onChange={onChange}
                    type="password"
                    name="password"
                    id="password"
                />
                <br />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <br />

                <Button variant="contained" type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;
