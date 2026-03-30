import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    browse: [
      { label: 'All listings', href: '#map' },
      { label: 'Residential', href: '#map' },
      { label: 'Commercial', href: '#map' },
      { label: 'By area', href: '#map' },
    ],
    company: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'For owners', href: '#for-owners' },
      { label: 'About us', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
    support: [
      { label: 'FAQs', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of service', href: '#' },
    ],
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container-wide py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-semibold text-lg">roatan.rent</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
                The platform for long-term rentals in Roatán. We connect property 
                owners with qualified tenants across the Bay Islands.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <a href="mailto:hello@roatan.rent" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>hello@roatan.rent</span>
                </a>
                <a href="tel:+50412345678" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+504 1234 5678</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Roatán, Bay Islands, Honduras</span>
                </div>
              </div>
            </div>

            {/* Browse */}
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-3">
                {footerLinks.browse.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} roatan.rent. All rights reserved.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
