import { useState } from "react";
import { Button } from "@mui/material";

type State = {
    title: string;
};

function Register(props: State) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function formSubmit(event: any) {
        event.preventDefault();

        console.log("Form submitted", username, password, confirmPassword);
    }

    return (
        <div className="register">
            <h1>{props.title}</h1>

            <form onSubmit={formSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />

                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <br />

                <Button variant="contained" type="submit">
                    Register
                </Button>
            </form>

            <hr />

            <div>
                <p>Userame: {username}</p>
                <p>Password: {password}</p>
                <p>Confirm Password: {confirmPassword}</p>
            </div>
        </div>
    );
}

export default Register;
