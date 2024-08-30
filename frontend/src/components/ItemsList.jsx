import React, { useEffect, useState } from "react";
import Header from "./Header"; // Adjust the path based on your folder structure

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3050/api/items");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItems(data);
        setFilteredItems(data); // Initialize filteredItems with all items
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
  }, [selectedCategory, items]);

  const filterItems = () => {
    let result = items;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((item) =>
        item.categories.includes(selectedCategory)
      );
    }

    setFilteredItems(result);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* <Header activePage="items" /> Include the Header component */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Items</h1>

        {/* Filter Options */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Clothing">Clothing</option>
            {/* Add more categories here as needed */}
          </select>
        </div>

        <ul>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li key={item._id} className="border-b border-gray-200 py-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>{item.description}</p>
                <p>Categories: {item.categories.join(", ")}</p>
              </li>
            ))
          ) : (
            <p>No items available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ItemsList;
