import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ValueProps from './sections/ValueProps';
import MapListings from './sections/MapListings';
import FeaturedProperties from './sections/FeaturedProperties';
import HowItWorks from './sections/HowItWorks';
import ForOwners from './sections/ForOwners';
import Footer from './sections/Footer';
import ListPropertyPage from './pages/ListPropertyPage';

function HomePage() {
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

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list-property" element={<ListPropertyPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
