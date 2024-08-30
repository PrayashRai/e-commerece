import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cart-actions';
import { FaCartShopping } from 'react-icons/fa6'; // Import the cart icon

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const onAddToCartHandler = (event) => {
    event.stopPropagation(); // Prevent the card's onClick event
    dispatch(addToCart(product));
  };

  return (
    <button className="btn btn-primary" onClick={onAddToCartHandler}>
      <FaCartShopping style={{ marginRight: '8px' }} /> {/* Add icon with some margin */}
      Add to Cart
    </button>
  );
};

export default AddToCartButton;


