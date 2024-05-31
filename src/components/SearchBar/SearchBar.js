import React, { useState } from 'react';
import styles from './SearchBar.module.scss';

const SearchBar = ({ setSearchQuery }) => {
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchText);
        setSearchText('');
        setSearchQuery(searchText);
    };

    return (
        <div className={styles.searchBar}>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Search recipes'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
