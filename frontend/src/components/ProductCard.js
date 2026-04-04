import React from 'react';

const ProductCard = ({ product, onProductClick }) => {
  return (
    <div 
      className="glass-card flex flex-col group overflow-hidden cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transform transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* 'Quick Add' Button styled as a bar at the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="w-full bg-[#e63946]/90 backdrop-blur-md text-white py-3 font-semibold uppercase tracking-widest text-xs hover:bg-[#d62828] transition-colors"
          >
            Select Size
          </button>
        </div>

        {/* Category Label */}
        <div className="absolute top-4 left-4 border border-[#fff]/20 bg-black/40 backdrop-blur-sm px-2 py-1 text-[10px] font-medium tracking-widest text-white uppercase">
          {product.category}
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow text-center">
        <h3 className="text-sm font-medium tracking-wide text-[#eee] mb-1 uppercase">{product.name}</h3>
        <p className="text-base font-semibold text-white drop-shadow-md">Rs. {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
