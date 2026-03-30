import { useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ValueProps from './sections/ValueProps';
import MapListings from './sections/MapListings';
import FeaturedProperties from './sections/FeaturedProperties';
import HowItWorks from './sections/HowItWorks';
import ForOwners from './sections/ForOwners';
import Footer from './sections/Footer';

function App() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <ValueProps />
        <MapListings />
        <FeaturedProperties />
        <HowItWorks />
        <ForOwners />
        <Footer />
      </main>
    </div>
  );
}

export default App;
