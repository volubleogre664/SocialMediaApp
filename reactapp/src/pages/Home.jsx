import PostForm from "../components/PostForm";
import Search from "../components/Search";

function Home() {
    return (
        <div>
            <Search />
            <h1>This is the Home page</h1>
            <PostForm />
        </div>
    );
}

export default Home;
