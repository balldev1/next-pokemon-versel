'use client'
import { useState, useEffect } from 'react';

export const ButtonTheme = () => {
    const [theme, setTheme] = useState('abyss'); // Default theme is 'retro'

    const toggleTheme = () => {
        const newTheme = theme === 'abyss' ? 'graden' : 'abyss'; // Switch themes
        setTheme(newTheme);
    };

    useEffect(() => {
        // Apply the theme to the <html> element
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <button onClick={toggleTheme}>
            Switch Theme
        </button>
    );
};
