import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import useForm from "../hooks/useForm";

type UploadValues = {
    media: string;
    mediaFile: any;
}

interface MediaUploadProps {
    mediaFileGetter: Function;
}

function MediaUpload({ mediaFileGetter }: MediaUploadProps) {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const { onChange, values } = useForm<UploadValues>(formSubmit, {
        media: "",
        mediaFile: null,
    });

    function formSubmit() {
        console.log("Form submitted", values);
    }

    useEffect(() => {
        if (values.mediaFile) {
            mediaFileGetter(values.mediaFile);
        }
    }, [values, mediaFileGetter]);

    return (
        <div>
            <form>
                <input ref={fileInput} style={{ display: "none" }} type="file"
                    id="media" name="media"
                    accept="image/*, video/*" onChange={onChange} />
                <Button variant="contained" onClick={(_) => {
                    fileInput.current?.click();
                }}>
                    upload
                </Button>
            </form>

        </div>
    );
}

export default MediaUpload;