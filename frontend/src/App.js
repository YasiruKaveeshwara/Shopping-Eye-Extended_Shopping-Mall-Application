import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import UpdateProfilePage from "./components/UpdateProfilePage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import ShopsListPage from "./components/ShopsList";
import ShopProfilePage from "./components/ShopProfilePage";
import ItemsListPage from "./components/ItemsList";
import SearchResults from "./components/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Header from "./components/Header"; // Import Header

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={ProfilePage} />}
        />
        <Route
          path="/update-profile"
          element={<ProtectedRoute element={UpdateProfilePage} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={ChangePasswordPage} />}
        />
        <Route path="/shops" element={<ShopsListPage />} />
        <Route path="/shop/:id" element={<ShopProfilePage />} />
        <Route path="/items" element={<ItemsListPage />} />
        <Route path="/search" element={<SearchResults />} />
        {/* <Route path="/item/:id" element={<ShopProfilePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
