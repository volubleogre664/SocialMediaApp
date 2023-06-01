import { useEffect } from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import useFetch from "../hooks/useFetch";
import { usePosts } from "../hooks/stateHooks";
import { PostState } from "../utils/Types";
import Search from "../components/Search"

import "../styles/pages/Home.css";

function Home() {
    const { posts, dispatch: setPosts } = usePosts();

    const { response, loading, error, fetchData, setResponse } = useFetch<
        PostState[]
    >({
        url: "POSTS",
        method: "GET",
    });

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
                <Search />
                <br />
                <br />
                <br />
                <h1>This is the Home page</h1>
                <PostForm />
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
