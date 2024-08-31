import React from 'react';
import { useTheme } from '@/app/provider/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center p-2 bg-gray-200 border border-primary dark:bg-gray-700 dark:border dark:border-secondary rounded-full transition-colors duration-500"
    >
      {theme === 'light' ? (
        <Sun className="w-6 h-6 text-warning" />
      ) : (
        <Moon className="w-6 h-6 text-primary" />
      )}
      <div
        className={`ml-2 w-12 h-6 bg-gray-300 dark:bg-gray-600  rounded-full relative transition-all duration-300`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            theme === 'dark' ? 'translate-x-6' : ''
          }`}
        ></div>
      </div>
    </button>
  );
}