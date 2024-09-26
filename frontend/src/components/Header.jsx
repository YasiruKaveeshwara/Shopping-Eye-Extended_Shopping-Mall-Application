import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = ({ searchQuery, setSearchQuery }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Only navigate if searchQuery is not empty
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
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
            } hover:text-orange-500`}
          >
            Home
          </Link>
          <Link
            to="/shops"
            className={`${
              isActive("/shops") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
          >
            Shops
          </Link>
          <Link
            to="/items"
            className={`${
              isActive("/items") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
          >
            Items
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about") ? "text-orange-500" : "text-gray-800"
            } hover:text-orange-500`}
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
