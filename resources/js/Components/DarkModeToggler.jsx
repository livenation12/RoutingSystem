import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';

const DarkModeToggler = () => {
          // Check for saved theme in localStorage or default to 'light'
          const savedTheme = localStorage.getItem('theme');
          const [isDarkMode, setIsDarkMode] = useState(savedTheme ? savedTheme === 'dark' : false);

          // Effect to update the <html> class when dark mode state changes
          useEffect(() => {
                    if (isDarkMode) {
                              document.documentElement.classList.add('dark'); // Add dark mode class to html element
                              localStorage.setItem('theme', 'dark');
                    } else {
                              document.documentElement.classList.remove('dark'); // Remove dark mode class
                              localStorage.setItem('theme', 'light');
                    }
          }, [isDarkMode]);

          // Toggle function
          const toggleDarkMode = () => {
                    setIsDarkMode((prev) => !prev);
          };

          return (
                    <PrimaryButton onClick={toggleDarkMode} >
                              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </PrimaryButton>
          );
};

export default DarkModeToggler;
