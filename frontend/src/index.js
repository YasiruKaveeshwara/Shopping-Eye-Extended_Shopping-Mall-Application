import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/forms/Loginform.js'; // Corrected path
import SignupForm from './components/forms/SignupForm.js'; // Corrected path
import Home from "./pages/Home.js";
import Services from "./pages/Services.js";
import Products from "./pages/Products.js";
import AddProducts from "./pages/AddProducts.js";
import ProductDescription from "./pages/ProductDescription.js";
import SignupDetails from './pages/SignupDetails';
import AddMeasurements from './pages/Recommendations/AddMeasurements.jsx';
import ListMeasurements from './pages/Recommendations/ListMeasurements.jsx';
import MyRecommendations from './pages/Recommendations/MyRecommendations.jsx';
import BodyTypeForm from './pages/Recommendations/BodyTypeForm.jsx';
import ListBodyTypes from './pages/Recommendations/ListBodyTypes.jsx';
import UpdateMeasurements from './pages/Recommendations/UpdateMeasurements.jsx';
import TestPage from './pages/Recommendations/TestPage.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext.js';

ReactDOM.render(

  <BrowserRouter>
    <AuthContextProvider>
    <Routes>
        {/* <Route path='/' element={<LoginForm />} /> */}
        <Route path='/login' element={<LoginForm />} />
        <Route path='/services' element={<Services />} />
        <Route path='/home' element={<Home />} /> 
        <Route path='/signup' element={<SignupForm />} /> 
        <Route path='/products' element={<Products />} /> 
        <Route path='/addproducts' element={<AddProducts />} /> 
        <Route path="/product/:id" element={<ProductDescription />} />
        <Route path="/profile" element={<SignupDetails />} />
        <Route path="/" element={<AddMeasurements />} />
        <Route path="/listMeasurements" element={<ListMeasurements />} />
        <Route path="/myRecommendations/:measurementsId" element={<MyRecommendations />} />
        <Route path='/updateMyMeasurements/:measurementsId' element={<AddMeasurements />} />
        <Route path='/bodyTypeForm' element={<BodyTypeForm />} />
        <Route path='/updateBodyType/:bodyTypeId' element={<BodyTypeForm />} />
        <Route path='/listBodyTypes' element={<ListBodyTypes />} />
        {/* <Route path='/myRecommendations/:measurementsId' element={<MyRecommendations />} /> */}
        {/* <Route path='/myRecommendations/:measurementsId' element={<TestPage />} /> */}

      </Routes>
      </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


