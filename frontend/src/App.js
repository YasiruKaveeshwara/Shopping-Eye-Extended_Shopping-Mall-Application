import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Corrected import path
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import UpdateProfilePage from "./components/UpdateProfilePage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import ShopsListPage from "./components/ShopsList";
import ShopProfilePage from "./components/ShopProfilePage";
import ItemsListPage from "./components/ItemsList";
import ItemPage from "./components/ItemPage";
import SearchResults from "./components/SearchResults";
import ViewWishList from "./components/ViewWishList";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

// yasiru

import ShopQR from "./pages/shopQR.jsx";
import Map from "./pages/map.jsx";
import ScanQR from "./pages/scanQR.jsx";
import Locations from "./pages/locations.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProtectedRoute element={ProfilePage} />} />
          <Route path='/update-profile' element={<ProtectedRoute element={UpdateProfilePage} />} />
          <Route path='/change-password' element={<ProtectedRoute element={ChangePasswordPage} />} />
          <Route path='/shops' element={<ShopsListPage />} />
          <Route path='/shops/:id' element={<ShopProfilePage />} />
          <Route path='/items' element={<ItemsListPage />} />
          <Route path='/items/:id' element={<ItemPage />} />
          <Route path='/wishlist' element={<ViewWishList />} />
          <Route path='/search' element={<SearchResults />} />

          {/* yasiru */}

          <Route path='/qr' element={<ShopQR />} />
          <Route path='/map' element={<Map />} />
          <Route path='/scanqr' element={<ScanQR />} />
          <Route path='/locations/:locationId' element={<Locations />} />
          <Route path='/locations/' element={<Locations />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
