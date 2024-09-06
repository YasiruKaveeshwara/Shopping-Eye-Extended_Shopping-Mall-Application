import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/forms/Loginform.js'; // Corrected path
import SignupForm from './components/forms/SignupForm.js'; // Corrected path
import Home from "./pages/Home.js";
import Services from "./pages/Services.js";
import Products from "./pages/Products.js";
import Shops from "./pages/Shops.js";
import AddProducts from "./pages/AddProducts.js";
import ProductDescription from "./pages/ProductDescription.js";
import SignupDetails from './pages/SignupDetails';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext.js';

ReactDOM.render(

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

      </Routes>
      </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


