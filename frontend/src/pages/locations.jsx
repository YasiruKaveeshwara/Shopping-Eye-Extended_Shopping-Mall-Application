import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Map from "./map.jsx";

export default function Locations() {
  const { locationId } = useParams(); // Get locationId from the URL
  const [inputValue, setInputValue] = useState(""); // Controlled input field
  const [searchId, setSearchId] = useState(""); // Search ID to trigger the map

  // Handle search button click
  const handleSearch = () => {
    setSearchId(inputValue); // Update searchId when user clicks search
  };

  // If locationId exists in URL, pre-fill the input and trigger Map re-render
  useEffect(() => {
    if (locationId) {
      setInputValue(locationId); // Pre-fill the input field
      setSearchId(locationId); // Trigger Map re-render with the locationId
    }
  }, [locationId]);

  // Optionally, you can log values to debug
  useEffect(() => {
    console.log("searchId updated:", searchId);
  }, [searchId]);

  return (
    <div>
      {/* Controlled input field */}
      <input
        id="searchInput"
        type="text"
        placeholder="Enter Block ID"
        value={inputValue} // Controlled by inputValue, not searchId
        onChange={(e) => setInputValue(e.target.value)} // Update inputValue on user typing
      />
      <button onClick={handleSearch}>Search</button>
      
      {/* Render the Map whenever searchId is updated */}
      {searchId && <Map searchId={searchId} />}
    </div>
  );
}
