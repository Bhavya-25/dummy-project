import React from 'react';

const CourseCard = ({ image, category, title, rating, reviews, price }) => {
  return (
    <div className="shadow-md rounded-xl overflow-hidden bg-white">
      <img src={image} alt="Course" className="w-full h-24 object-cover" />
      <div className="p-2">
        <p className="text-xs text-gray-500">{category}</p>
        <p className="text-sm font-semibold line-clamp-2">{title}</p>
        <p className="text-xs text-gray-500">
          {rating} ⭐ ({reviews})
        </p>
        <p className="font-bold text-right text-sm mt-1">₹ {price}/hr</p>
      </div>
    </div>
  );
};

export default CourseCard;
