import React from 'react';

// src/components/RestaurantCard.js
const RestaurantCard = ({ resData }) => {
  // Handle both API response format and mock data format
  const restaurantInfo = resData?.info || resData?.data;
  
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    costForTwoString,
    sla,
    deliveryTime,
    aggregatedDiscountInfoV3,
    aggregatedDiscountInfoV2,
  } = restaurantInfo || {};

  return (
    <div className="group cursor-pointer transform transition-all duration-200 hover:scale-95">
      {/* Image Container */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={cloudinaryImageId ? 
            `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}` :
            'https://via.placeholder.com/300x200?text=Restaurant'
          }
          alt={name || 'Restaurant'}
        />
        {/* Discount Banner */}
        {(aggregatedDiscountInfoV3?.header || aggregatedDiscountInfoV2?.header) && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white font-bold">
              {aggregatedDiscountInfoV3?.header || aggregatedDiscountInfoV2?.header}
              {(aggregatedDiscountInfoV3?.subHeader || aggregatedDiscountInfoV2?.subHeader) && 
                ` ${aggregatedDiscountInfoV3?.subHeader || aggregatedDiscountInfoV2?.subHeader}`}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-xl mb-2 truncate">{name || 'Restaurant Name'}</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-white bg-green-500 px-2 py-1 text-sm rounded">
              ⭐ {avgRating || '4.0'}
            </span>
          </div>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{sla?.deliveryTime || deliveryTime || '30'} mins</span>
        </div>
        <p className="text-gray-600 text-sm truncate">
          {cuisines ? cuisines.join(", ") : 'Various Cuisines'}
        </p>
        <p className="text-gray-600 text-sm">{costForTwo || costForTwoString || '₹300 FOR TWO'}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
