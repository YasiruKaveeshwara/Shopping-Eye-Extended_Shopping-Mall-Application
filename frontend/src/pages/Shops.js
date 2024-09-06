import React, { useEffect, useState } from 'react';
import SignupForm from '../components/forms/SignupForm';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import Header from '../components/header/Header';

export default function Shops() {
  const [shop, setShop] = useState(null); // To store logged-in shop details
  const [editingShop, setEditingShop] = useState(null);

  useEffect(() => {
    const loggedInShopEmail = localStorage.getItem('userEmail'); // Get the logged-in shop's email from local storage
    if (loggedInShopEmail) {
      fetchShopDetails(loggedInShopEmail); // Fetch shop details by email or other unique identifier
    }
  }, []);

  const fetchShopDetails = async (email) => {
    try {
      const response = await fetch(`http://localhost:3050/api/getShops?email=${email}`); // Adjust API call to fetch based on email
      const data = await response.json();
      if (response.ok) {
        setShop(data);
        // Update local storage with shop details
        localStorage.setItem("shopName", data.shopName);
        localStorage.setItem("shopLogo", data.shopLogo);
      } else {
        console.error('Error fetching shop:', data.message);
      }
    } catch (error) {
      console.error('Error fetching shop:', error);
    }
  };
  

  const handleEdit = (shop) => {
    setEditingShop(shop);
  };

  const handleCancelEdit = () => {
    setEditingShop(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/api/shops/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setShop(null);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  return (
    <>
      <SidebarIcon />
      <div className="main">
        <Header />
        <h2>Your Shop</h2>
        {editingShop ? (
          <SignupForm
            shop={editingShop}
            onSuccess={() => {
              setEditingShop(null);
              fetchShopDetails(localStorage.getItem('userEmail')); // Refresh after editing
            }}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="shop-grid">
            {shop ? (
              <div key={shop._id} className="shop-card">
                <h3>{shop.shopName}</h3>
                <p>Owner: {shop.ownerName}</p>
                <p>shopCategory: {shop.shopCategory}</p>
                <p>Location: {shop.location}</p>
                <p>Phone: {shop.phone}</p>
                <p>Email: {shop.email}</p>
                <p>Logo:   {shop.shopLogo && (
        <img
          src={shop.shopLogo}
          alt={shop.shopName}
          className="shop-image"
        />
      )}</p>
                <button onClick={() => handleEdit(shop)}>Edit</button>
                <button onClick={() => handleDelete(shop._id)}>Delete</button>
              </div>
            ) : (
              <p>No shop available for the logged-in user.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
