import { Person } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useUser } from "hooks/stateHooks";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const { user } = useUser();
    const navigate = useNavigate();

    if (user.userId === 0) navigate("/login");

    return (
        <div>
            <h1>User Profile</h1>

            <div>
                {!user.avatarUrl ? (
                    <Avatar sx={{ width: 100, height: 100 }}>
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
                <p>Username: {user.username}</p>
                <p>First name: {user.firstName}</p>
                <p>Last name: {user.lastName}</p>
            </div>
        </div>
    );
}

export default UserProfile;
