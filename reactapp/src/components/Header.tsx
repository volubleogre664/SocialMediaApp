import NavLink from "./NavLink";

import "../styles/components/Header.css";

function Header() {
    return (
        <div className="header">
            <div className="header__logo">Social Media</div>

            <nav className="header__nav">
                <NavLink to="/" text="Home" />
                <NavLink to="/chat" text="Chat" />
                <NavLink to="/user-profile" text="Profile" />
                <NavLink to="/login" text="Login" />
                <NavLink to="/register" text="Register" />
            </nav>
        </div>
    );
}

export default Header;
