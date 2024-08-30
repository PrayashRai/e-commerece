// src/components/FavoriteIcon.jsx
import React from 'react';
import { GrFavorite } from 'react-icons/gr';

const FavoriteIcon = ({ isFavorite, onClick }) => {
  return (
    <GrFavorite
      className="favorite-icon"
      style={{ color: isFavorite ? 'red' : 'black', cursor: 'pointer' }}
      onClick={onClick}
    />
  );
};

export default FavoriteIcon;
