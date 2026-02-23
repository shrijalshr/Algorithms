import React from 'react';
import { motion as Motion } from 'framer-motion';
import Lottie from 'lottie-react';
import coffeeAnimation from '../assets/coffee-animation.json';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#F8F5F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center">
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#4A3B32] mb-6 leading-tight">
            Taste the <span className="text-[#C8A97E]">Vibe.</span>
          </h1>
          <p className="text-lg text-[#333333]/80 mb-8 max-w-md">
            Your cozy escape in the heart of Biratnagar. Exceptional coffee, delicious bites, and the best company (including Simba 🐈).
          </p>
          <div className="flex gap-4">
             <a href="#menu"><Button variant="primary">View Menu</Button></a>
             <a href="#about"><Button variant="outline">Our Story</Button></a>
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
           <div className="w-80 h-80 md:w-96 md:h-96 relative">
             <Lottie animationData={coffeeAnimation} loop={true} />
           </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
