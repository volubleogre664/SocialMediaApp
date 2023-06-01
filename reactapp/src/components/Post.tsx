import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import ForumIcon from "@mui/icons-material/Forum";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import dayjs from "dayjs";

import { PostType, Comment, Like, UserState } from "../utils/Types";
import { useUser, usePosts } from "../hooks/stateHooks";
import useFetch from "../hooks/useFetch";

import "../styles/components/Post.css";

type PostProps = {
    post: PostType;
    postOwner: UserState;
    comments: Comment[];
    likes: Like[];
};

function Post({ post, postOwner, comments, likes }: PostProps) {
    const [expand, setExpand] = useState(false);
    const [comment, setComment] = useState("");
    const { user } = useUser();
    const { dispatch: setPosts } = usePosts();
    const [mediaFile, setMediaFile] = useState<File | null>(null);

    const {
        fetchData: sendLike,
        response: likeResponse,
        setResponse: setLikeRes,
    } = useFetch<Like>({
        url: "LIKE",
        method: "POST",
        body: {
            likeId: 0,
            postId: post.postId,
            userId: user.userId,
        },
    });

    const {
        response: commentResponse,
        fetchData: sendComment,
        setResponse: setCommentRes,
    } = useFetch<Comment>({
        url: "COMMENT",
        method: "POST",
        body: {
            commentId: 0,
            postId: post.postId,
            userId: user.userId,
            text: comment,
            dateTimePosted: new Date(),
        },
    });

    const {
        response: mediaResponse,
        fetchData: getMedia,

    } = useFetch<File>({
        url: "MEDIA",
        method: "GET",
        query: "/" + post.mediaUrl
    });

    const openComments = () => {
        setExpand(!expand);
    };

    const likePost = (e: any) => {
        if (!user.userId) return alert("Login to like a post");

        e.preventDefault();
        sendLike();
    };

    const commentOnPost = (e: any) => {
        e.preventDefault();
        sendComment();
    };

    const getColor = function () {
        if (likes.find((like) => like.userId === user.userId)) {
            return "red";
        } else {
            return "inherit";
        }
    };

    useEffect(() => {
        if (likeResponse) {
            setPosts({ type: "addLike", payload: likeResponse });
        }

        return () => {
            setLikeRes(null);
        };
    }, [setLikeRes, likeResponse]);

    useEffect(() => {
        if (commentResponse) {
            setPosts({ type: "addComment", payload: commentResponse });
            setComment("");
        }

        return () => {
            setCommentRes(null);
        };
    }, [setCommentRes, commentResponse]);

    useEffect(() => {
        if (post.mediaUrl) {
            getMedia();
        }
    }, [post.mediaUrl])

    useEffect(() => {
        if (mediaResponse) {
            console.log(mediaResponse);
            setMediaFile(mediaResponse);
        }
    }, [mediaResponse])

    return (
        <div className="post">
            <Card sx={{ maxWidth: 600, minWidth: 350 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {postOwner.firstName[0]}
                            {postOwner.lastName[0]}
                        </Avatar>
                    }
                    title={`${postOwner.firstName} ${postOwner.lastName}`}
                    subheader={dayjs(post.dateTimePosted).format(
                        "MMMM DD, YYYY"
                    )}
                />
                {mediaFile != null ? (
                    mediaFile.type.includes("image") ? (
                        <CardMedia
                            component="img"
                            height="194"
                            src={URL.createObjectURL(mediaFile)}
                            alt="Paella dish"
                        />
                    ) : (
                        <CardMedia
                            component="video"
                            controls
                            height="194"
                            src={URL.createObjectURL(mediaFile)}
                        />
                    )
                ) :
                    ""}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.text}
                    </Typography>
                </CardContent>
                <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                    disableSpacing
                >
                    <IconButton
                        onClick={likePost}
                        className="post__btn"
                        aria-label="add to favorites"
                    >
                        <FavoriteIcon style={{ color: getColor() }} />{" "}
                        <span>{likes.length || ""}</span>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className="post__btn"
                        onClick={openComments}
                        size="small"
                    >
                        <ForumIcon />
                        <span>{comments.length || ""}</span>
                    </IconButton>
                </CardActions>
                <Collapse
                    style={{ borderTop: "1px solid black" }}
                    in={expand}
                    timeout="auto"
                    unmountOnExit
                >
                    <CardContent>
                        <Typography paragraph>
                            <b>Comments:</b>
                        </Typography>
                        <main className="post__comments">
                            {comments.map((comment) => (
                                <div
                                    key={comment.commentId}
                                    className="post__comment"
                                >
                                    <Typography
                                        paragraph
                                    >{`${comment.authorFirstName} ${comment.authorLastName}`}</Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {comment.text}
                                    </Typography>

                                    <small className="post__commentDate">
                                        {dayjs(comment.date).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </small>
                                </div>
                            ))}
                        </main>

                        <Box
                            component="form"
                            className="post__commentForm"
                            onSubmit={commentOnPost}
                            sx={{
                                "& .MuiTextField-root": { m: 1, width: "25ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {(user.userId && (
                                <>
                                    <TextField
                                        style={{
                                            flex: 1,
                                            margin: 0,
                                        }}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        className="post__commentInput"
                                        id="outlined-textarea"
                                        label=""
                                        placeholder="Leave a comment"
                                        maxRows={4}
                                        multiline
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className="post__commentSend"
                                    >
                                        Send
                                    </Button>
                                </>
                            )) || (
                                    <p style={{ textAlign: "center" }}>
                                        Login to comment
                                    </p>
                                )}
                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default Post;
