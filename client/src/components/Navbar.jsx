// components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
            <h1 style={styles.title}>Enriched URLs</h1>
                <form onSubmit={handleSearchSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by country"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Search</button>
                </form>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        width: '100%',
        backgroundColor: 'white', 
        color: '#333', 
        padding: '10px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        borderBottom: '1px solid #ddd', 
    },
    title:{ color: '#8a21ed' },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        padding: '5px',
        marginRight: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd', 
        outline: 'none',
    },
    button: {
        padding: '5px 10px',
        borderRadius: '4px',
        border: '1px solid #555', 
        backgroundColor: '#8a21ed',
        color: 'white',
        cursor: 'pointer',
    }
};

export default Navbar;
