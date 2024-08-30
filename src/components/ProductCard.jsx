import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import FavoriteIcon from '../components/FavouriteIcon'; // Ensure this path is correct
import { renderStars } from '../utils/ratingUtils'; // Ensure this path is correct

const ProductCard = ({ product, handleFavoriteClick, handleAddToCart }) => {
  const { id, title, image, price, rating, isFavorite } = product;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="col-sm-3">
      <div className="card" onClick={handleCardClick}>
        <div className="card-body">
          <FavoriteIcon
            isFavorite={isFavorite}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card's onClick event
              handleFavoriteClick(); // Handle the click to remove from wishlist
            }}
          />
          <img src={image} alt={title} className="card-img-top" />
          <p className="card-title">
            <span style={{ fontWeight: "bold", color: "black", fontSize: "0.8rem" }}>
              Brand,
            </span>
            <span style={{ color: "gray", fontSize: "0.8em" }}> {title}</span>
            <div className="rating">
              {rating && renderStars(rating.rate, rating.count)} {/* Ensure renderStars is defined */}
            </div>
          </p>
          <span>${price}</span>
          <div>
            <AddToCartButton 
              product={product} 
              onClick={() => handleAddToCart(product)} // Handle add to cart click
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
