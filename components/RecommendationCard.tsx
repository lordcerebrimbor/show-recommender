import React from 'react';
import { ShowRecommendation } from '../types';

interface RecommendationCardProps {
  show: ShowRecommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ show }) => {
  return (
    <li className="bg-base-200 p-5 border-l-4 border-accent">
      <h3 className="text-3xl font-bold text-gray-100 mb-2">{show.name}</h3>
      <p className="text-accent font-bold mb-3">Rating: {show.rating.toFixed(1)} / 10</p>
      <p className="text-gray-400 text-lg leading-relaxed">{show.overview}</p>
    </li>
  );
};

export default RecommendationCard;