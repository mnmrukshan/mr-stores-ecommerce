import React from 'react';

const categories = ["All", "Shirts", "T-Shirts", "Jeans", "Bottoms", "Sweaters"];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full flex justify-center py-8 px-4 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-4 md:space-x-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap pb-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
              selectedCategory === category
                ? 'text-white border-b-2 border-[#e63946]'
                : 'text-[#666] hover:text-[#bbb]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
