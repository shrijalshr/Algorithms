import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import MenuGrid from '../components/MenuGrid';
import { motion as Motion } from 'framer-motion';

const Home = () => {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <MenuGrid />
    </Motion.div>
  );
};

export default Home;
