import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishList } from '../redux/actions/wishlistActions';
import { addToCart } from '../redux/actions/cart-actions';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishList(product.id)); // Remove from wishlist after adding to cart
  };

  const handleFavoriteClick = (product) => {
    dispatch(removeFromWishList(product.id)); // Remove from wishlist
  };

  return (
    <>
      <Header />
      <Navbar setCategory={() => {}} />
      <div className="container">
        <h2>Your Wishlist</h2>
        <div className="row">
          {wishList.length > 0 ? (
            wishList.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, isFavorite: true }}
                handleAddToCart={() => handleAddToCart(product)}
                handleFavoriteClick={() => handleFavoriteClick(product)}
              />
            ))
          ) : (
            <p>No items in your wishlist.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
