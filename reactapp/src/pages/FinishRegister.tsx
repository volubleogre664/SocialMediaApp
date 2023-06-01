import { useEffect, useRef } from "react";

import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import { Person, PublishRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";

import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/stateHooks";

import { UserState } from "../utils/Types";

import "../styles/pages/FinishRegister.css";

type RegisterValues = {
    authUserId: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
};

function FinishRegister() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { dispatch } = useUser();
    const { onChange, onSubmit, values } = useForm<RegisterValues>(
        registerUser,
        {
            authUserId: localStorage.getItem("auth") || "",
            username: "",
            firstName: "",
            lastName: "",
            avatarUrl: "",
        }
    );

    const { loading, error, response, fetchData } = useFetch<UserState>({
        url: "FINALIZE_REGISTER",
        query: "",
        method: "POST",
        body: values,
    });

    function registerUser() {
        fetchData();
    }

    function cancelRegister() {
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        if (response) {
            if (response.firstName.length > 0) {
                dispatch({
                    type: "setUser",
                    payload: response,
                });

                navigate("/user-profile");
                localStorage.removeItem("auth");
            }
        }
    }, [response, dispatch, navigate]);

    return (
        <div className="account">
            {loading && <Loader />}

            <h1>Account Setup</h1>

            <Box className="account__form" component="form" onSubmit={onSubmit}>
                <div className="avatar__label">
                    <label htmlFor="avatarUrl">Profile Picture</label>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        name="avatarUrl"
                        id="avatarUrl"
                        onChange={onChange}
                        ref={fileInputRef}
                        placeholder="Profile Picture"
                    />

                    <div>
                        {!values.avatarUrl ? (
                            <Avatar sx={{ width: 120, height: 120 }}>
                                <Person />
                            </Avatar>
                        ) : (
                            <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={values.avatarUrl}
                            />
                        )}
                    </div>

                    <IconButton
                        className="avatar__uploadBtn"
                        onClick={() => fileInputRef?.current?.click()}
                        component="span"
                    >
                        <PublishRounded />
                    </IconButton>
                </div>

                <div>
                    <TextField
                        type="text"
                        name="username"
                        id="username"
                        onChange={onChange}
                        value={values.username}
                        label="Username"
                    />
                </div>

                <div>
                    <TextField
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={onChange}
                        value={values.firstName}
                        label="First Name"
                    />
                </div>

                <div>
                    <TextField
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={onChange}
                        value={values.lastName}
                        label="Last Name"
                    />
                </div>

                <footer className="account__footer">
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={cancelRegister}>
                        Cancel
                    </Button>
                </footer>
            </Box>
        </div>
    );
}

export default FinishRegister;
