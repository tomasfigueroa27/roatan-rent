import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Listings', href: '#listings' },
    { label: 'Map', href: '#map' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'For Owners', href: '#for-owners' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg text-gray-900">
                roatan.rent
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
              <button
                onClick={() => navigate('/list-property')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                List your property
              </button>
              <a href="#listings" className="btn-primary text-sm">
                Browse listings
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 lg:hidden">
          <div className="container-wide py-8">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-900 py-3 border-b border-gray-100"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate('/list-property'); }}
                className="btn-primary text-center mt-4"
              >
                List your property
              </button>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-secondary text-center"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
