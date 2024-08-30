import React, { useEffect, useState } from "react";
import axios from "axios";
import Endpoints from "../api/Endpoints";
import Product from "./Product";


const ProductList = ({ category, excludeProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `${Endpoints.PRODUCT_URL}/category/${category}`
          : Endpoints.PRODUCT_URL;
        const response = await axios.get(url);
        // Filter out the product with excludeProductId
        const filteredProducts = response.data.filter(
          (product) => product.id !== excludeProductId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, excludeProductId]);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
