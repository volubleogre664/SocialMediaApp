import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../context/store";
import { setUser } from "../context/slices/userSlice";
import { UserState } from "../utils/Types";
import {
    setPosts,
    addComment,
    addPost,
    addLike,
} from "../context/slices/postSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useUser = () => {
    const user = useAppSelector((state) => state.user.user as UserState);
    const dispatchUser = useAppDispatch();

    type UserDispatch = {
        type: string;
        payload: any;
    };

    const dispatch = ({ type, payload }: UserDispatch) => {
        switch (type) {
            case "setUser":
                dispatchUser(setUser(payload));
                break;
            default:
                break;
        }
    };

    return { user, dispatch };
};

const usePosts = () => {
    const posts = useAppSelector((state) => state.posts.posts);
    const dispatchPosts = useAppDispatch();

    type PostsDispatch = {
        type: string;
        payload: any;
    };

    const dispatch = ({ type, payload }: PostsDispatch) => {
        switch (type) {
            case "setPosts":
                dispatchPosts(setPosts(payload));
                break;
            case "addPost":
                dispatchPosts(addPost(payload));
                break;
            case "addComment":
                dispatchPosts(addComment(payload));
                break;
            case "addLike":
                dispatchPosts(addLike(payload));
                break;
            default:
                break;
        }
    };

    return { posts, dispatch };
};

export { useUser, usePosts };
