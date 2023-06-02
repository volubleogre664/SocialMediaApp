import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import PostForm from "../components/PostForm";
import Post from "../components/Post";
import useFetch from "../hooks/useFetch";
import { usePosts, useUser } from "../hooks/stateHooks";
import { PostState } from "../utils/Types";
import Search from "../components/Search";

import "../styles/pages/Home.css";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Home() {
    const { posts, dispatch: setPosts } = usePosts();
    const { user } = useUser();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    const { response, loading, error, fetchData, setResponse } = useFetch<
        PostState[]
    >({
        url: "POSTS",
        method: "GET",
    });

    function toggleSearch(state: boolean) {
        setShowSearch(state);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (response) {
            setPosts({ type: "setPosts", payload: response });
        }

        return () => {
            setResponse(null);
        };
    }, [response, setResponse, setPosts]);

    return (
        <div className="home">
            <div className="home__container">
                <IconButton onClick={() => toggleSearch(!showSearch)}>
                    <SearchIcon color="primary" />
                </IconButton>
                {showSearch && <Search closeSearch={() => toggleSearch(false)} />}
                {user != null && <PostForm />}
                <main className="home__main">
                    {posts.map((post: PostState) => (
                        <Post
                            key={post.post.postId}
                            post={post.post}
                            comments={post.comments}
                            likes={post.likes}
                            postOwner={post.postOwner}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}

export default Home;
