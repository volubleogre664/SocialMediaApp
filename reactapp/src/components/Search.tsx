import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Paper,
    TextField,
    Avatar,
    ListItemAvatar,
    Typography,
} from "@mui/material";

interface SearchResult {
    postId: number;
    userId: number;
    text: string;
    DateTimePosted: Date;
    MediaUrl: string;
}

interface UserProfile {
    userId: number;
    authUserId: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

const SearchComponent = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

    const handleSearch = async (e: { target: { value: any } }) => {
        const newKeyword = e.target.value.toLowerCase();
        setKeyword(newKeyword);

        if (newKeyword === "") {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get(
                "https://localhost:7285/api/search",
                {
                    params: { keyword: newKeyword },
                }
            );
            //console.log(response.data)
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserProfiles = async () => {
        try {
            const response = await axios.get<UserProfile[]>(
                "https://localhost:7285/api/user/Get"
            );
            setUserProfiles(response.data);
            //console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const viewPost = (postId: number) => {
        let post = document.getElementById(`post-${postId}`);

        if (post) {
            post.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    const getUserProfileById = (userId: number) => {
        const userProfile = userProfiles.find(
            (profile) => profile.userId === userId
        );
        //console.log(userId);
        return userProfile || null;
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 300,
                bgcolor: "background.paper",
                position: "fixed",
                zIndex: 9999,
            }}
        >
            <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                id="outlined-basic"
                value={keyword}
                onChange={handleSearch}
                placeholder="Search for a post..."
            />
            {keyword !== "" && (
                <Paper>
                    <List>
                        {results.map((result, index) => {
                            const userProfile = getUserProfileById(
                                result.userId
                            );
                            return (
                                <ListItem
                                    key={index}
                                    onClick={() => viewPost(result.postId)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                        },
                                    }}
                                >
                                    {userProfile && (
                                        <ListItemAvatar>
                                            <Avatar
                                                src={userProfile.avatarUrl}
                                                alt={`${userProfile.firstName} ${userProfile.lastName}`}
                                            />
                                        </ListItemAvatar>
                                    )}
                                    <ListItemText
                                        primary={
                                            userProfile
                                                ? userProfile.firstName +
                                                  " " +
                                                  userProfile.lastName
                                                : "Unknown User"
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: "inline" }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {result.text}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            )}
            {/*<ul>*/}
            {/*    {results.map((result: { text: string }, index) => (*/}
            {/*        <li key={index}>*/}
            {/*            <a href={`https://example.com/${result.postId}`} target="_blank" rel="noopener noreferrer">*/}
            {/*                {result.text}*/}
            {/*            </a>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </Box>
    );
};

export default SearchComponent;
