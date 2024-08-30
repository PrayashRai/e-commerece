// src/utils/ratingUtils.js
import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const renderStars = (rating, count) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const starIcons = [];

  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<FaStar key={`star-${i}`} color="gold" />);
  }
  if (hasHalfStar) {
    starIcons.push(<FaStarHalfAlt key="star-half" color="gold" />);
  }
  while (starIcons.length < 5) {
    starIcons.push(<FaStar key={`empty-${starIcons.length}`} color="lightgray" />);
  }

  return (
    <div>
      <div className="stars">
        {starIcons}
        <span className="rating-count">({count})</span>
      </div>
    
    </div>
  );
};
