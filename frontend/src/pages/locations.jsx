import React, { useState } from "react";
import Map from "./map.jsx";

export default function Locations() {
  const [searchId, setSearchId] = useState(""); // State to hold the search input

  const handleSearch = () => {
    const id = document.getElementById("searchInput").value;
    setSearchId(id); // Update the searchId state
  };

  return (
    <div>
      <input id='searchInput' type='text' placeholder='Enter Block ID' />
      <button onClick={handleSearch}>Search</button>
      <Map searchId={searchId} />
    </div>
  );
}
