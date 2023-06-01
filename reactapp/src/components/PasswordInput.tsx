import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";

type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    label: string;
    name: string;
};

function PasswordInput(props: Props) {
    const [showPassword, setShowPassword] = useState(false);

    function handleMouseDownPassword(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void {
        event.preventDefault();
    }

    return (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
                {props.label}
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            style={{
                                width: "35px",
                                height: "35px",
                            }}
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={props.label}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
            />
        </FormControl>
    );
}

export default PasswordInput;
