import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ searchQuery, setSearchQuery }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set true if token exists, otherwise false
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`); // Fixed template literal
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="bg-white shadow p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-gray-800">Shopping EYE</span>
        </div>

        <nav className="hidden md:flex space-x-8 text-gray-800">
          <Link
            to="/home"
            className={`${
              isActive("/home") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`} // Fixed className syntax
          >
            Home
          </Link>
          <Link
            to="/shops"
            className={`${
              isActive("/shops") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`} // Fixed className syntax
          >
            Shops
          </Link>
          <Link
            to="/items"
            className={`${
              isActive("/items") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`} // Fixed className syntax
          >
            Items
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`} // Fixed className syntax
          >
            About
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shops and items..."
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Link to="/profile">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
                Profile
              </button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg">
                  Join now →
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
