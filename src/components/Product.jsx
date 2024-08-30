import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from '../redux/actions/wishlistActions';
import { renderStars } from '../utils/ratingUtils';
import AddToCartButton from '../components/AddToCartButton';
import FavoriteIcon from "../components/FavouriteIcon";

const Product = (props) => {
  const { id, title, image, price, rating } = props.data;
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const navigate = useNavigate();

  // Check if the product is in the wishlist
  const isFavorite = wishList.some(item => item.id === id);

  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // Prevent the card's onClick event
    if (isFavorite) {
      dispatch(removeFromWishList(id));
    } else {
      dispatch(addToWishList(props.data));
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="col-sm-3">
      <div className="card" onClick={handleCardClick}>
        <div className="card-body">
          <FavoriteIcon
            isFavorite={isFavorite}
            onClick={handleFavoriteClick} // Pass event directly here
          />
          <img src={image} alt={title} className="card-img-top" />
          <p className="card-title">
            <span style={{ fontWeight: "bold", color: "black", fontSize: "0.8rem" }}>
              Brand,
            </span>
            <span style={{ color: "gray", fontSize: "0.8em" }}> {title}</span>
            <div className="rating">
              {rating && renderStars(rating.rate, rating.count)}
            </div>
          </p>
          <span>${price}</span>
          <div>
            <AddToCartButton product={props.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
