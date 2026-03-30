import { useState } from 'react';
import { Search, MapPin, Home, ChevronDown } from 'lucide-react';

const propertyTypes = ['All types', 'House', 'Condo', 'Apartment', 'Commercial'];
const areas = ['All areas', 'West End', 'West Bay', 'Sandy Bay', 'French Harbour', 'Pristine Bay'];

const HeroSection = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All types');
  const [area, setArea] = useState('All areas');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const handleSearch = () => {
    const mapSection = document.getElementById('map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#0ea5e9]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600">Long-term rentals in Roatán</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Find your home
            <br />
            <span className="text-[#0ea5e9]">on the island</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Browse verified long-term rentals across Roatán. From beachfront condos 
            to commercial spaces, find your perfect place with local support.
          </p>

          {/* Search bar */}
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Location input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent w-full outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Property type dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTypeDropdown(!showTypeDropdown);
                    setShowAreaDropdown(false);
                  }}
                  className="w-full sm:w-auto flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-900">{propertyType}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setPropertyType(type);
                          setShowTypeDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-900"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Area dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowAreaDropdown(!showAreaDropdown);
                    setShowTypeDropdown(false);
                  }}
                  className="w-full sm:w-auto flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-900">{area}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showAreaDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showAreaDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                    {areas.map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          setArea(a);
                          setShowAreaDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-900"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="btn-primary flex items-center justify-center gap-2 px-8"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-sm text-gray-500">Listings</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-500">Neighborhoods</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-500">Response time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
