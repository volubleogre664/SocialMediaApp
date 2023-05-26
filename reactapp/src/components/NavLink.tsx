import { Link } from "react-router-dom";

type NavLinkProps = {
    to: string;
    text: string;
};

function NavLink(props: NavLinkProps) {
    return <Link to={props.to}>{props.text}</Link>;
}

export default NavLink;
