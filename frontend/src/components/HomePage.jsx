import React from "react";
import heropic2 from "../images/heroPic2.png";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        {/* Hero Section */}
        <section className="relative mb-12">
          <div className="absolute inset-0">
            <img
              // src="https://via.placeholder.com/1920x1080" // Replace with the desired hero image
              src={heropic2}
              alt="Shopping Mall"
              className="w-full h-96 object-cover"
            />
            <div className="bg-black opacity-50 h-full w-full absolute top-0 left-0"></div>
          </div>
          <div className="relative z-10 p-4 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Shopping EYE</h1>
            <p className="text-lg mb-6">Your ultimate shopping destination.</p>
            <button className="bg-green-500 px-6 py-3 rounded-lg">
              Start Shopping
            </button>
          </div>
        </section>

        {/* Body Type Recommendations */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Body Type Recommendations
          </h2>
          <p className="text-gray-600 mb-2">
            Find outfits tailored to your body type!
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Discover Your Body Type
          </button>
        </section>

        {/* Clothing Color Recommendations */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Clothing Color Recommendations
          </h2>
          <p className="text-gray-600 mb-2">
            Find colors that suit your skin undertone!
          </p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
            Discover Your Colors
          </button>
        </section>

        {/* Store Directory */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Explore Our Stores</h2>
          <p className="text-gray-600 mb-2">
            Check out all the stores in the mall!
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            View Stores
          </button>
        </section>

        {/* Featured Items with Filters */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Featured Items
          </h2>
          {/* Item Filters */}
          <div className="mb-4 text-center">
            <select className="border p-2 rounded-lg">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
            </select>
            <input
              type="number"
              placeholder="Max Price"
              className="ml-4 border p-2 rounded-lg"
            />
          </div>
          {/* Placeholder for featured items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden">
                <img
                  src={`https://via.placeholder.com/300?text=Item+${item}`} // Placeholder image
                  alt={`Item ${item}`}
                  className="w-full h-40 object-cover mb-2"
                />
                <h3 className="font-semibold text-center">Item {item}</h3>
                <p className="text-gray-600 text-center">$29.99</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wishlist Feature */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Your Wishlist</h2>
          <p className="text-gray-600 mb-2">
            Keep track of your favorite items!
          </p>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
            View Wishlist
          </button>
          <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg">
            Download Wishlist
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
