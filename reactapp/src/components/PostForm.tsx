import { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import { usePosts, useUser } from "../hooks/stateHooks";

import { FetchResults } from "../utils/Types";
import MediaUpload from "./MediaUpload";
import API_ENDPOINTS from "../utils/ApiRoutes";
import MediaPreview from "./MediaPreview";

type FormValues = {
    postId: number;
    userId: number;
    text: string;
    mediaUrl: string;
    dateTimePosted: string;
};

type MediaValues = {
    media: string;
    mediaFile: File | null;
}

type RegisterResponse = {
    token: string;
    text: string;
};


function PostForm() {
    const { user } = useUser();
    const { dispatch: setPosts } = usePosts();
    const { updateValues, onChange, onSubmit, values } = useForm<FormValues>(formSubmit, {
        postId: 0,
        userId: user.userId,
        text: "",
        mediaUrl: "",
        dateTimePosted: new Date().toISOString(),
    });

    const { onChange: mediaOnChange, values: mediaValues, updateValues: updateMediaValue } = useForm<MediaValues>(() => { }, {
        media: "",
        mediaFile: null,
    })
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const mediaInput = useRef<HTMLInputElement | null>(null);

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
            setPosts({
                type: "addPost", payload: {
                    post: response,
                    postOwner: user,
                    comments: [],
                    likes: [],
                }
            });
        }
        if (mediaFile) {
            updateValues("mediaUrl", mediaFile.name);
        }
    }, [response, mediaFile]);

    return (
        <div>
            <Card variant="outlined" sx={{ minWidth: 275, maxWidth: 600 }}>
                <CardContent>
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

                    {mediaValues.mediaFile != null && (<MediaPreview file={mediaValues.mediaFile} onPreviewClose={() => updateMediaValue("mediaFile", null)} />)}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>

                    <input ref={mediaInput} style={{ display: "none" }} type="file"
                        id="media" name="media"
                        accept="image/*, video/*" onChange={mediaOnChange} />
                    <IconButton onClick={(_) => {
                        mediaInput.current?.click();
                    }}>
                        <ImageIcon color="primary" />
                    </IconButton>

                    <Button variant="contained" onClick={(e: any) => formSubmit()}>
                        Create Post
                    </Button>
                </CardActions>
            </Card>
            <div>
            </div>
            <MediaUpload mediaFileGetter={(file: File) => setMediaFile(file)} />
        </div>
    );
}

export default PostForm;