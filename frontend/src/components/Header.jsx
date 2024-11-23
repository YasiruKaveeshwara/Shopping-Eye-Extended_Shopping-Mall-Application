import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import scanIcon from "../images/qrcode.gif";

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
    <header className='p-6 bg-white shadow'>
      <div className='container flex items-center justify-between mx-auto'>
        <div className='flex items-center space-x-4'>
          <span className='text-2xl font-bold text-gray-800'>Shopping EYE</span>
        </div>

        <nav className='hidden space-x-8 text-gray-800 md:flex'>
          <Link to='/home' className={`${isActive("/home") ? "text-orange-500" : "text-gray-800"} hover:text-orange-500`}>
            Home
          </Link>
          <Link to='/shops' className={`${isActive("/shops") ? "text-orange-500" : "text-gray-800"} hover:text-orange-500`}>
            Shops
          </Link>
          <Link to='/items' className={`${isActive("/items") ? "text-orange-500" : "text-gray-800"} hover:text-orange-500`}>
            Items
          </Link>
          <Link to='/locations' className={`${isActive("/locations") ? "text-orange-500" : "text-gray-800"} hover:text-orange-500`}>
            Locations
          </Link>
          <Link to='/about' className={`${isActive("/about") ? "text-orange-500" : "text-gray-800"} hover:text-orange-500`}>
            About
          </Link>
        </nav>

        <form onSubmit={handleSearch} className='flex space-x-4'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search shops and items...'
            className='p-2 border border-gray-300 rounded-md'
          />
          <button type='submit' className='px-4 py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600'>
            Search
          </button>
        </form>

        <div className='icons'>
          <img
            src={scanIcon}
            alt='scan'
            className='w-10 scan-icon'
            onClick={() => (window.location.href = "/scanqr")} // Show ScanQR popup on click
          />
        </div>

        <div className='flex items-center space-x-4'>
          {isAuthenticated ? (
            <Link to='/profile'>
              <button className='px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Profile</button>
            </Link>
          ) : (
            <>
              <Link to='/login'>
                <button className='px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600'>Login</button>
              </Link>
              <Link to='/register'>
                <button className='px-6 py-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600'>Join now →</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
