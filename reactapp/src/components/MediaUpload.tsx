import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import useForm from "../hooks/useForm";

type UploadValues = {
    avatar: string;
    avatarFile: any;
}

interface MediaUploadProps {
    mediaFileGetter: Function;
}

function MediaUpload({ mediaFileGetter }: MediaUploadProps) {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const { onChange, values } = useForm<UploadValues>(formSubmit, {
        avatar: "",
        avatarFile: null,
    });

    function formSubmit() {
        console.log("Form submitted", values);
    }

    useEffect(() => {
        if (values.avatarFile) {
            mediaFileGetter(values.avatarFile);
        }
    }, [values, mediaFileGetter]);

    return (
        <div>
            <form>
                <input ref={fileInput} style={{ display: "none" }} type="file"
                    id="avatar" name="avatar"
                    accept="image/*, video/*" onChange={onChange} />
                <Button variant="contained" onClick={(_) => {
                    fileInput.current?.click();
                }}>
                    upload
                </Button>
            </form>

            <img src={values.avatar} alt="" />
        </div>
    );
}

export default MediaUpload;