import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { mockMenuItems } from '../lib/mockData';

const MenuGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchMenuItems = async () => {
        try {
          if (supabase) {
            const { data, error } = await supabase
              .from('menu_items')
              .select('*')
              .eq('available', true);

            if (error) throw error;
            if (data && data.length > 0) {
                setItems(data);
            } else {
                 // Fallback if empty
                setItems(mockMenuItems);
            }
          } else {
            // Use mock data
            setItems(mockMenuItems);
          }
        } catch (error) {
          console.error('Error fetching menu:', error);
          setItems(mockMenuItems); // Fallback on error
        } finally {
          setLoading(false);
        }
      };

    fetchMenuItems();
  }, []);

  // Compute categories from items
  // We need to make sure 'All' is always there, and unique categories.
  const categories = ['All', ...new Set(items.map(item => item.category))];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-[#F8F5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#4A3B32] mb-4">Our Menu</h2>
          <p className="text-[#333333]/70">Curated with love.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#4A3B32] text-white shadow-lg'
                  : 'bg-white text-[#4A3B32] border border-[#E5E0DC] hover:border-[#4A3B32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
            <div className="text-center py-20">Loading...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
                <Motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#4A3B32]">{item.name}</h3>
                        <span className="text-[#C8A97E] font-bold">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-[#F8F5F2] text-[#4A3B32] text-xs font-medium rounded-full">
                        {item.category}
                    </span>
                </div>
                </Motion.div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;
