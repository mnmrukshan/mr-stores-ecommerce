import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-[#0a0a0a] text-[#888888] text-[10px] md:text-xs tracking-[0.2em] uppercase py-2 flex justify-center items-center border-b border-[#1f1f1f]">
      <span className="cursor-pointer hover:text-white transition-colors mx-4">&lt;</span>
      <span>Shop New Styles Now</span>
      <span className="cursor-pointer hover:text-white transition-colors mx-4">&gt;</span>
    </div>
  );
};

export default TopBar;
