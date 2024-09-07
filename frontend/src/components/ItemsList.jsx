import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const ItemsList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const [categories, setCategories] = useState([]); // State for unique categories

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/items");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);
        setFilteredItems(data); // Initialize filteredItems with all items
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category))
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, items, minPrice, maxPrice, selectedLocation]);

  const filterItems = () => {
    let result = items;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((item) =>
        item.category.includes(selectedCategory)
      );
    }

    // Filter by price range
    if (minPrice)
      result = result.filter((item) => item.price >= parseFloat(minPrice));
    if (maxPrice)
      result = result.filter((item) => item.price <= parseFloat(maxPrice));

    // Filter by location
    if (selectedLocation && selectedLocation !== "All") {
      result = result.filter((item) => {
        const firstDigit = String(item.shopLocation).charAt(1);
        return firstDigit === selectedLocation;
      });
    }

    setFilteredItems(result);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (e) => {
    if (e.target.name === "minPrice") {
      setMinPrice(e.target.value);
    } else {
      setMaxPrice(e.target.value);
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };

  const handleWishlistToggle = (item) => {
    if (wishlist.includes(item)) {
      setWishlist(wishlist.filter((wishItem) => wishItem._id !== item._id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  const isInWishlist = (item) => {
    return wishlist.some((wishItem) => wishItem._id === item._id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      {/* Left Sidebar Filter Options */}
      <div className="w-1/6 pl-16 pt-10 border-r">
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <ul>
            <li>
              <button
                className={`block mb-2 ${
                  selectedCategory === "All" ? "text-orange-500" : ""
                }`}
                onClick={() => handleCategoryChange("All")}
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`block mb-2 ${
                    selectedCategory === category ? "text-orange-500" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="mb-2">
            <input
              type="number"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceChange}
              placeholder="Min Price"
              style={{ width: "100px" }} // Custom width
              className="w-50 border p-2 mr-2 mb-5"
            />
            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceChange}
              placeholder="Max Price"
              style={{ width: "100px" }} // Custom width
              className="w-50 border p-2"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6 w-50">
          <h3 className="font-semibold mb-2">Location</h3>
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            style={{ width: "100px" }} // Custom width
            className="w-20 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="All">All</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </select>
        </div>
      </div>

      {/* Right Side - Items List */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-semibold mb-4">Items</h1>
        <div className="bg-white p-6 rounded shadow-sm mb-6">
          {/* <h2 className="text-2xl font-semibold mb-4">Products</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-100 p-4 rounded shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-50 h-50 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {item.productName}
                  </h3>
                  <p className="text-gray-700">Category: {item.category}</p>
                  <p className="text-gray-700">Price: ${item.price}</p>
                  <p className="text-gray-700">Size: {item.size}</p>
                  <p className="text-gray-700">Location: {item.itemLocation}</p>
                  {/* <p className="mt-2">{item.description}</p> */}
                </div>
              ))
            ) : (
              <p>No products available for this shop.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
