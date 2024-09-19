import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// Import your styles from a separate file
import '../sidebar/styles.css';

function PopularItemView({ product, onEdit, onDelete, onWishlist }) {
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="product-card"
      style={{
        height: '365px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        marginTop: '0px', 
      }}
    >
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="product-image"
        />
      )}
      <h3>{product.productName}</h3>
      <p className="itemdetails" style={{ fontSize: '14px',padding: '10px' }}>
        Price: ${product.price}
        <br />
        Category: {product.category}
        <br />
        Shop Location: {product.shopLocation}
      </p>
    </div>
  );
}

PopularItemView.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onWishlist: PropTypes.func,
};

export default PopularItemView;
