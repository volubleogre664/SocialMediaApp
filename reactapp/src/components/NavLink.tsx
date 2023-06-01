import { Link } from "react-router-dom";
import { useUser } from "../hooks/stateHooks";

type NavLinkProps = {
    to: string;
    text: string;
};

function NavLink(props: NavLinkProps) {
    const { dispatch } = useUser();

    if (props.to === "/logout") {
        return (
            <Link
                to="/"
                onClick={() => {
                    localStorage.removeItem("token");
                    dispatch({ type: "setUser", payload: null });
                }}
            >
                {props.text}
            </Link>
        );
    }

    return <Link to={props.to}>{props.text}</Link>;
}

export default NavLink;
