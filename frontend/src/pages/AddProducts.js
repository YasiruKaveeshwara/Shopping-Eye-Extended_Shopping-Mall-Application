import React from "react";
import SidebarIcon from "../components/sidebar/SidebarIcon"; // Corrected path to SidebarIcon
import Header from "../components/header/Header";
import "../components/sidebar/styles.css";
import ProductsForm from "../components/forms/ProductsForm";

export default function Products() {
  return (
    <>
      <SidebarIcon />  
      <div className="main">
      <Header /> 
        <h2>Add items form</h2>
        <ProductsForm /> 
      </div>
    </>
  );
}