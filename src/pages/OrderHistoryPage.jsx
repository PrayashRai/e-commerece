import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";



const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch the order history from local storage
    const storedOrderHistory = localStorage.getItem("orderHistory");
    if (storedOrderHistory) {
      setOrderHistory(JSON.parse(storedOrderHistory));
    }
  }, []);

  return (
<>
<Header />
    <Navbar setCategory={() => {}} />
    <div className="container mt-5">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderHistory.map((item) => (
          <div key={item.id} className="product-item d-flex align-items-center mb-3">
            <img src={item.image} alt={item.title} className="product-image mr-3" />
            <div className="product-details">
              <h6>{item.title}</h6>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div></>
  );
};

export default OrderHistoryPage;
