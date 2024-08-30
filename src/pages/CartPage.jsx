import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { FaTrash } from 'react-icons/fa';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/actions/cart-actions';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Carts = useSelector((state) => state.cart.Carts);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalQuantity = Carts.reduce((total, item) => total + item.quantity, 0);
  const subtotalPrice = Carts.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }

    // Save the cart items to local storage
    localStorage.setItem("orderHistory", JSON.stringify(Carts));
    // Clear the cart in the Redux store
    dispatch(clearCart());
    navigate("/order-history");
  };

  return (
    <>
      <Header />
      <Navbar setCategory={() => {}} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 product-list">
            <h2>Products in Cart</h2>
            {Carts.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              Carts.map((item) => (
                <div key={item.id} className="product-item d-flex align-items-center mb-3">
                  <img src={item.image} alt={item.title} className="product-image mr-3" />
                  <div className="product-details">
                    <h6>{item.title}</h6>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                      <span>Quantity: {item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <FaTrash
                    className="delete-icon ml-auto"
                    onClick={() => handleRemoveFromCart(item.id)}
                  />
                </div>
              ))
            )}
          </div>
          <div className="col-md-4 order-summary">
            <h2>Order Summary</h2>
            <div className="order-details">
              <p>Total Quantity: {totalQuantity}</p>
              <h4>Subtotal: ${subtotalPrice.toFixed(2)}</h4>
            </div>
            <hr />
            <button className="btn btn-primary btn-block" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
