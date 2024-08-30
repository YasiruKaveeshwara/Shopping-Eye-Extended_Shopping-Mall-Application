import React, { useState } from "react";
import Header from "./Header";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      /> */}

      <main className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Shopping EYE</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover spaces, services, and more.
        </p>
        {/* Additional content can go here */}
      </main>
    </div>
  );
};

export default HomePage;
