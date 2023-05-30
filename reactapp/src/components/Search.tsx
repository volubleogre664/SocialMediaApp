import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText, Box, Paper, TextField, Avatar } from '@mui/material';

interface SearchResult {
    postId: number,
    userId: number,
    text: string,
    dateTimePosted: Date,
    mediaUrl: string
}

interface UserProfile {
    userId: number,
    authUserId: number,
    username: string,
    firstname: string,
    lastname: string,
    avatarUrl: string
}

const SearchComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

    const handleSearch = async (e: { target: { value: any; }; }) => {
        const newKeyword = e.target.value.toLowerCase();
        setKeyword(newKeyword);

        if (newKeyword === '') {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get('https://localhost:7285/api/search', {
                params: { keyword: newKeyword }
            });

            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    const fetchUserProfiles = async () => {
        try {
            const response = await axios.get<UserProfile[]>('https://localhost:7285/api/user-profiles');
            setUserProfiles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserProfileById = (userId: number) => {
        const userProfile = userProfiles.find((profile) => profile.userId === userId);
        return userProfile ? userProfile : null;
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <TextField variant="outlined" id="outlined-basic" value={keyword} onChange={handleSearch} placeholder="Search for a post..." />
            {keyword !== '' && (
                <Paper>
                    <List>
                        {results.map((result, index) => {
                            const userProfile = getUserProfileById(result.userId);
                            return (
                                <ListItem key={index}>
                                    <ListItemButton component="a" href={`https://example.com/${result.postId}`} target="_blank" rel="noopener noreferrer">
                                        {userProfile && (
                                            <Avatar src={userProfile.avatarUrl} alt={`${userProfile.firstname} ${userProfile.lastname}`} />
                                        )}
                                        <ListItemText primary={result.text} secondary={userProfile ? userProfile.username : null} />
                                    </ListItemButton>
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