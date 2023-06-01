import { useEffect } from "react";
import { Person } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useUser } from "../hooks/stateHooks";
import { useNavigate } from "react-router-dom";

import "../styles/pages/UserProfile.css";

function UserProfile() {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="profile">
            <h1 className="profile__header">Welcome {user?.firstName}</h1>

            <main className="profile__main">
                <div className="profile__imgContainer">
                    {!user?.avatarUrl ? (
                        <Avatar sx={{ width: 150, height: 150 }}>
                            <Person style={{ fontSize: "6rem" }} />
                        </Avatar>
                    ) : (
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={user.avatarUrl}
                        />
                    )}
                </div>

                <div>
                    <p className="profile__userInfo">
                        <b>Username:</b> <span>{user?.username}</span>
                    </p>
                    <p className="profile__userInfo">
                        <b>First name:</b> <span>{user?.firstName}</span>
                    </p>
                    <p className="profile__userInfo">
                        <b>Last name:</b> <span>{user?.lastName}</span>
                    </p>
                </div>
            </main>

            <div className="profile__actionBtns">
                <Button variant="contained">Change Details</Button>
                <Button variant="contained">Change Password</Button>
                <Button variant="contained">Change Avatar</Button>
            </div>
        </div>
    );
}

export default UserProfile;
