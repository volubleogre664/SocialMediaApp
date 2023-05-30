import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";

import { FetchResults } from "../utils/Types";
import MediaUpload from "./MediaUpload";
import API_ENDPOINTS from "../utils/ApiRoutes";

type FormValues = {
    postID: number;
    userID: number;
    text: string;
    mediaUrl: string;
    dateTimePosted: string;
};

type RegisterResponse = {
    token: string;
    text: string;
};


function PostForm() {
    const { updateValues, onChange, onSubmit, values } = useForm<FormValues>(formSubmit, {
        postID: 0,
        userID: 0,
        text: "",
        mediaUrl: "",
        dateTimePosted: new Date().toISOString(),
    });
    const [mediaFile, setMediaFile] = useState<File | null>(null);

    const { loading, error, fetchData, response }: FetchResults =
        useFetch<RegisterResponse>({
            url: "POSTS",
            query: "",
            method: "POST",
            body: values,
        });

    async function formSubmit() {
        await uploadMediaFile();
        fetchData();
    }

    async function uploadMediaFile() {
        if (!mediaFile) {
            return;
        }

        const formData = new FormData();
        formData.append("file", mediaFile);

        const url = API_ENDPOINTS["MEDIA"];
        try {
            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });
            console.log(mediaFile.name)
            if (res.ok)
                updateValues("mediaUrl", mediaFile.name);
        } catch (error) {

        }

        console.log(values);
    }

    useEffect(() => {
        if (response) {
            console.log("Response", response);
        }
        if (mediaFile) {
            updateValues("mediaUrl", mediaFile.name);
        }
    }, [response, mediaFile]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Box>
                    <TextField
                        multiline
                        rows={4}
                        placeholder="What's happening?"
                        value={values.text}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        name="text"
                        id="text"
                    />
                </Box>

                <input
                    value={values.userID}
                    onChange={onChange}
                    type="hidden"
                    name="userID"
                    id="userID"
                />
                <input
                    value={values.postID}
                    onChange={onChange}
                    type="hidden"
                    name="postID"
                    id="postID"
                />
                <input
                    value={values.mediaUrl}
                    onChange={onChange}
                    type="hidden"
                    name="mediaUrl"
                    id="mediaUrl"
                />

                <Button variant="contained" type="submit">
                    Tweet
                </Button>
            </form>
            <MediaUpload mediaFileGetter={(file: File) => setMediaFile(file)} />
        </div>
    );
}

export default PostForm;