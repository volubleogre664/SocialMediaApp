import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PostState, Comment, Like } from "../../utils/Types";

type PostsState = {
    posts: PostState[];
};

const initialState: PostsState = {
    posts: [],
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostState[] | null>) => {
            state.posts = action.payload || [];
        },
        addPost: (state, action: PayloadAction<PostState | null>) => {
            if (action.payload) state.posts = [action.payload, ...state.posts];
        },
        addComment: (state, action: PayloadAction<Comment | null>) => {
            if (action.payload) {
                const postId = action.payload.postId;
                const post = state.posts.find(
                    (post) => post.post.postId === postId
                );
                if (post) post.comments.push(action.payload);
            }
        },
        addLike: (state, action: PayloadAction<Like | null>) => {
            if (action.payload) {
                const postId = action.payload.postId;
                const post = state.posts.find(
                    (post) => post.post.postId === postId
                );
                if (!post) return;

                const like = post.likes.find(
                    (like) => like.userId === action.payload?.userId
                );

                if (like) {
                    post.likes = post.likes.filter(
                        (like) => like.userId !== action.payload?.userId
                    );
                } else {
                    post.likes.push(action.payload);
                }
            }
        },
    },
});

export const { setPosts, addPost, addComment, addLike } = postSlice.actions;

export const selectUser = (state: RootState): PostState[] =>
    state.posts.posts as PostState[];

export default postSlice.reducer;
