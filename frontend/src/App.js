// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/forms/Loginform.js';
import SignupForm from './components/forms/SignupForm.js';
import FeedbackPage from './components/FeedbackPage.js';
import Home from "./pages/Home.js";
import Services from "./pages/Services.js";
import Products from "./pages/Products.js";
import Shops from "./pages/Shops.js";
import AddProducts from "./pages/AddProducts.js";
import ProductDescription from "./pages/ProductDescription.js";
import SignupDetails from './pages/SignupDetails';
import { AuthContextProvider } from './context/AuthContext.js';
import AnalyticsPage from "./pages/AnalyticsPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/services' element={<Services />} />
          <Route path='/home' element={<Home />} /> 
          <Route path='/signup' element={<SignupForm />} /> 
          <Route path='/products' element={<Products />} /> 
          <Route path='/shops' element={<Shops />} /> 
          <Route path='/addproducts' element={<AddProducts />} /> 
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/profile" element={<SignupDetails />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
