import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../sidebar/styles.css';
import Heart from '../../images/heart.png';
import EyeIcon from '../../images/eye.png';
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/bin.png';

function ItemView({ product, onEdit, onDelete, onWishlist }) {
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card">
      {onWishlist && (
        <div className="heart-icon-container">
          <button className="icon-button" onClick={() => onWishlist(product)}>
            <img src={Heart} alt="Wishlist" className="wishlist-icon" />
          </button>
        </div>
      )}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="product-image"
        />
      )}
      <h3>{product.productName}</h3>
      <p>
        Price: ${product.price}
        <br />
        Category: {product.category}
        <br />
        Shop Location: {product.shopLocation}
        <br />
      </p>
      <div className="button-group">
        {onEdit && (
          <button className="icon-button" onClick={() => onEdit(product)}>
            <img src={EditIcon} alt="Edit" className="icon" />
          </button>
        )}
        {onDelete && (
          <button className="icon-button" onClick={() => onDelete(product._id)}>
            <img src={DeleteIcon} alt="Delete" className="icon" />
          </button>
        )}
        <button className="icon-button" onClick={() => handleViewProduct(product)}>
          <img src={EyeIcon} alt="View Details" className="wishlist-icon" />
        </button>
      </div>
    </div>
  );
}

ItemView.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onWishlist: PropTypes.func,
};

export default ItemView;
