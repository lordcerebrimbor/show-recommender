import React from 'react';

interface StarRatingProps {
  rating: number; // Rating out of 10
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className={`inline-block ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
    fill="currentColor"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151L12 .587z" />
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.round(rating / 2); // Round to nearest whole star on a 5-star scale

  const stars = Array.from({ length: totalStars }, (_, i) => (
    <StarIcon key={i} filled={i < fullStars} />
  ));

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2 text-sm font-semibold text-gray-400">{rating.toFixed(1)} / 10</span>
    </div>
  );
};

export default StarRating;