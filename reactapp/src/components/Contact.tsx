import { Avatar } from "@mui/material";

import "../styles/components/Contact.css";

type Props = {
    name: string;
    picture: string;
    lastMessage: string;
};

// Generate a color from a string
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 35,
            height: 35,
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

function Contact({ name, picture, lastMessage }: Props) {
    const sizes: any = {};

    return (
        <div className="contact">
            <div className="contact__main">
                <div>
                    {picture ? (
                        <Avatar sx={{ ...sizes }} alt={name} src={picture} />
                    ) : (
                        <Avatar
                            style={{ fontSize: ".9rem" }}
                            {...stringAvatar(name)}
                        />
                    )}
                </div>

                <p>{name}</p>
            </div>
        </div>
    );
}

export default Contact;
