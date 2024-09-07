import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState({ shops: [], items: [] });
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shops</h2>
        {results.shops.length > 0 ? (
          results.shops.map((shop) => (
            <div key={shop._id} className="p-4 border-b">
              <h3 className="text-lg font-bold">{shop.shopName}</h3>
              <p>{shop.description}</p>
            </div>
          ))
        ) : (
          <p>No shops found.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        {results.items.length > 0 ? (
          results.items.map((item) => (
            <div key={item._id} className="p-4 border-b">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
