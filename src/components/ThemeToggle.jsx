import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Inicializa el tema según la preferencia del usuario o el sistema
    const root = document.documentElement;
    const initialTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(initialTheme === 'dark');
    root.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = isDarkMode ? 'light' : 'dark';
    root.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className={`py-2 px-4 rounded ${
        isDarkMode ? 'bg-darkSurface text-darkTextPrimary' : 'bg-primary text-white'
      }`}
      onClick={toggleTheme}
    >
      {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default ThemeToggle;
