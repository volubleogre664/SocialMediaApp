import NavLink from "./NavLink";
import { useUser } from "../hooks/stateHooks";

import "../styles/components/Header.css";

function Header() {
    const { user } = useUser();

    return (
        <div className="header">
            <div className="header__logo"><NavLink to="/" text="Social Media" /></div>

            <nav className="header__nav">

                {user ? (
                    <>
                        <NavLink to="/chat" text="Chat" />
                        <NavLink to="/user-profile" text="Profile" />
                        <NavLink to="/logout" text="Logout" />
                    </>
                ) : (
                    <>
                        <NavLink to="/login" text="Login" />
                        <NavLink to="/register" text="Register" />
                    </>
                )}
            </nav>
        </div>
    );
}

export default Header;
