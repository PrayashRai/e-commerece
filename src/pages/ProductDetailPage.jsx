import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Endpoints from "../api/Endpoints";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cart-actions";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/actions/wishlistActions";
import { renderStars } from "../utils/ratingUtils";
import ProductList from "../components/ProductList";
import FavoriteIcon from "../components/FavouriteIcon";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList); // Access wishlist state

  const fetchData = useCallback(() => {
    axios
      .get(`${Endpoints.PRODUCT_BY_ID}${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching product data:", error);
        setError("Failed to fetch product data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const onAddToCartHandler = () => {
    dispatch(addToCart(product));
  };

  // Check if the product is in the wishlist
  const isFavorite = wishList.some((item) => item.id === product.id);

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // Prevent the card's onClick event
    if (isFavorite) {
      dispatch(removeFromWishList(product.id));
    } else {
      dispatch(addToWishList(product));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <Navbar setCategory={() => {}} />{" "}
      {/* Pass an empty function or handle it as needed */}
      <div className="container">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-3">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                />
              ) : (
                <img
                  src="/path-to-fallback-image.jpg" // Replace with the actual path to a fallback image
                  alt="No available"
                  className="img-fluid"
                />
              )}
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <h5 className="mb-0">{product.title}</h5>
                <FavoriteIcon
                  isFavorite={isFavorite}
                  onClick={handleFavoriteClick}
                />
              </div>
              <p>{product.category}</p>
              <p>{product.description}</p>
              <p>
                <div className="rating">
                  {product.rating &&
                    renderStars(product.rating.rate, product.rating.count)}
                </div>
              </p>
              <h2>
                <span>$ {product.price}</span>
              </h2>

              <br />
              <button className="btn btn-primary" onClick={onAddToCartHandler}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <ProductList category={product.category} excludeProductId={product.id} />
    </>
  );
};

export default ProductDetailPage;
