import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e: { target: { value: any; }; }) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);

        try {
            const response = await axios.get('/api/search', {
                params: { keyword: newKeyword }
            });

            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" value={keyword} onChange={handleSearch} placeholder="Search for a post..." />
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;