import React from 'react';
import { Hero } from '../components/pages/home/Hero';
import { PopularArtists } from '../components/pages/home/PopularArtists';
import { PopularArtwork } from '../components/pages/home/PopularArtwork';
import { Gallery } from '../components/pages/home/Gallery';
import { About } from '../components/pages/home/About';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <Hero />
      <PopularArtists />
      <PopularArtwork />
      <Gallery />
      <About />
    </div>
  );
};

export default HomePage;
