import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Adjust the path based on your folder structure

const ShopsListPage = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/shops");
        const data = await response.json();
        setShops(data);
        setFilteredShops(data); // Initialize filteredShops with all shops
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    filterShops();
  }, [selectedCategory, selectedLocation, searchQuery, shops]);

  const filterShops = () => {
    let result = shops;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((shop) => shop.category === selectedCategory);
    }

    // Filter by location (first digit of the location number)
    if (selectedLocation && selectedLocation !== "All") {
      result = result.filter((shop) => {
        const firstDigit = String(shop.location).charAt(0);
        return firstDigit === selectedLocation;
      });
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((shop) =>
        shop.shopName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredShops(result);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterShops();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleShopClick = (id) => {
    navigate(`/shop/${id}`); // Navigate to the shop profile page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      /> */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">All Shops</h1>

        {/* Filter Options */}
        <div className="mb-4 flex space-x-4">
          <div style={{ maxWidth: "150px" }}>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by shop category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Clothing">Clothing</option>
              <option value="Beauty">Beauty</option>
              <option value="Pets">Pets</option>
              <option value="Sports">Sports</option>
              {/* Add more categories here as needed */}
            </select>
          </div>

          <div style={{ maxWidth: "150px" }}>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by shop location
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="All">All</option>
              <option value="1">Level 1 (e.g., 101, 103)</option>
              <option value="2">Level 2 (e.g., 205, 234)</option>
              <option value="3">Level 3 (e.g., 301, 303)</option>
              {/* Add more levels as needed */}
            </select>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <li
              key={shop._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleShopClick(shop._id)} // Add click handler
            >
              <h2 className="text-2xl font-semibold mb-2">{shop.shopName}</h2>
              <p className="text-gray-700">Location: {shop.location}</p>
              <p className="text-gray-700">Category: {shop.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopsListPage;
