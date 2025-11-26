import { Moon, Star, Sun, TrendingUp } from "lucide-react";
import React from "react";
import { useTheme } from "../../context/theme-context";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-800 ">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Sol taraf */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="text-gray-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white ">
                Coin Tracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kripto Para Takip Sistemi
              </p>
            </div>
          </div>

          {/* sağ taraf */}

          <div className="flex items-center space-x-4">
            {/* favoriler */}
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Star className="size-5" />
              <span className="text-sm">1</span>
            </button>
            {/* tema butonu */}
            <button
              onClick={toggleTheme}
              className=" p-2 bg-gray-100 hover:bg-gray-200 transition rounded-lg  dark:bg-gray-700 dark:hover:bg-gray-600 "
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" />
              ) : (
                <Moon className="text-gray-400" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-green-500 animate-ping" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Canlı
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
