import { useEffect, useRef } from "react";

import { Avatar, Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";

import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/stateHooks";

import { UserState } from "../utils/Types";

// import placeholderImg from "../assets/placeholder-image-person-jpg.jpg";

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
        method: "POST",
        body: values,
    });

    function registerUser() {
        fetchData();
    }

    useEffect(() => {
        if (response) {
            if (response.firstName.length > 0) {
                dispatch({
                    type: "setUser",
                    payload: response,
                });

                navigate("/user-profile");
            }
        }
    }, [response, dispatch, navigate]);

    return (
        <div>
            {loading && <Loader />}

            <h1>Complete Setting up your account</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={onChange}
                        value={values.username}
                        placeholder="Username"
                    />
                </div>

                <div>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={onChange}
                        value={values.firstName}
                        placeholder="First name"
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={onChange}
                        value={values.lastName}
                        placeholder="Last name"
                    />
                </div>

                <div>
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
                            <Avatar sx={{ width: 100, height: 100 }}>
                                <Person />
                            </Avatar>
                        ) : (
                            <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={values.avatarUrl}
                            />
                        )}
                    </div>

                    <Button
                        onClick={() => fileInputRef?.current?.click()}
                        variant="contained"
                        component="span"
                    >
                        Upload
                    </Button>
                </div>

                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default FinishRegister;
