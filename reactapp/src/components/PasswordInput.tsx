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
    id: string;
    error?: boolean;
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
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <OutlinedInput
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
                required
                error={props.error}
                label={props.label}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                id={props.id}
            />
        </FormControl>
    );
}

export default PasswordInput;
