import React from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

const ProductGrid = ({ onProductClick, selectedCategory = 'All', searchQuery = '' }) => {
  const filteredProducts = productsData.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const title = selectedCategory === 'All' ? 'Featured collection' : selectedCategory;

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-white drop-shadow-md">
          {title}
        </h2>
        <div className="w-12 h-[1px] mt-6 bg-[#666]"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onProductClick={onProductClick} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
