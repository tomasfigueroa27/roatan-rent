import { useState } from 'react';
import { MapPin, Bed, Bath, Square, X, Filter, List } from 'lucide-react';

// Sample listings data with coordinates (approximate for Roatan)
const listings = [
  {
    id: 1,
    title: 'Beachfront Villa West Bay',
    type: 'House',
    area: 'West Bay',
    price: 2800,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: '/featured_home_exterior.jpg',
    x: 25,
    y: 65,
    featured: true,
  },
  {
    id: 2,
    title: 'Modern Condo West End',
    type: 'Condo',
    area: 'West End',
    price: 1500,
    beds: 2,
    baths: 2,
    sqft: 950,
    image: '/property_condo_1.jpg',
    x: 35,
    y: 55,
    featured: false,
  },
  {
    id: 3,
    title: 'Cozy Apartment Sandy Bay',
    type: 'Apartment',
    area: 'Sandy Bay',
    price: 900,
    beds: 1,
    baths: 1,
    sqft: 600,
    image: '/property_apartment_1.jpg',
    x: 45,
    y: 45,
    featured: false,
  },
  {
    id: 4,
    title: 'Retail Space French Harbour',
    type: 'Commercial',
    area: 'French Harbour',
    price: 2000,
    beds: 0,
    baths: 1,
    sqft: 1200,
    image: '/featured_commercial_retail.jpg',
    x: 70,
    y: 35,
    featured: true,
  },
  {
    id: 5,
    title: 'Ocean View House Pristine Bay',
    type: 'House',
    area: 'Pristine Bay',
    price: 3200,
    beds: 4,
    baths: 3,
    sqft: 2400,
    image: '/hero_living_room.jpg',
    x: 55,
    y: 25,
    featured: false,
  },
  {
    id: 6,
    title: 'Office Space French Harbour',
    type: 'Commercial',
    area: 'French Harbour',
    price: 1800,
    beds: 0,
    baths: 1,
    sqft: 1000,
    image: '/property_office_1.jpg',
    x: 75,
    y: 40,
    featured: false,
  },
];

const areas = ['All areas', 'West End', 'West Bay', 'Sandy Bay', 'French Harbour', 'Pristine Bay'];
const types = ['All types', 'House', 'Condo', 'Apartment', 'Commercial'];

const MapListings = () => {
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [hoveredListing, setHoveredListing] = useState<number | null>(null);
  const [filterArea, setFilterArea] = useState('All areas');
  const [filterType, setFilterType] = useState('All types');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'list'>('split');

  const filteredListings = listings.filter((listing) => {
    const areaMatch = filterArea === 'All areas' || listing.area === filterArea;
    const typeMatch = filterType === 'All types' || listing.type === filterType;
    return areaMatch && typeMatch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="map" className="section-padding bg-gray-50">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Browse on the map
            </h2>
            <p className="text-gray-600">
              Explore listings across Roatán. Click a marker to see details.
            </p>
          </div>

          {/* Filters and view toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('split')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'split' ? 'bg-gray-100' : ''}`}
              >
                <MapPin className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-xl border border-gray-100">
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              {areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setFilterArea('All areas');
                setFilterType('All types');
              }}
              className="text-sm text-[#0ea5e9] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Map and listings */}
        <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Map */}
          {viewMode === 'split' && (
            <div className="relative bg-[#e0f2fe] rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px]">
              {/* Stylized map of Roatan */}
              <svg
                viewBox="0 0 100 80"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Ocean background */}
                <rect width="100" height="80" fill="#e0f2fe" />
                
                {/* Main island shape (simplified Roatan) */}
                <path
                  d="M10,50 Q15,30 30,25 Q50,20 70,25 Q90,30 95,45 Q90,60 70,65 Q50,70 30,65 Q10,60 10,50 Z"
                  fill="#86efac"
                  stroke="#4ade80"
                  strokeWidth="0.5"
                />
                
                {/* Roads */}
                <path
                  d="M20,45 Q40,40 60,42 Q80,45 90,48"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M35,30 Q40,45 45,60"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M60,35 Q65,50 70,60"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />

                {/* Area labels */}
                <text x="30" y="60" fontSize="3" fill="#166534" fontWeight="600">West Bay</text>
                <text x="35" y="50" fontSize="3" fill="#166534" fontWeight="600">West End</text>
                <text x="45" y="40" fontSize="3" fill="#166534" fontWeight="600">Sandy Bay</text>
                <text x="70" y="35" fontSize="3" fill="#166534" fontWeight="600">French Harbour</text>
                <text x="55" y="25" fontSize="3" fill="#166534" fontWeight="600">Pristine Bay</text>
              </svg>

              {/* Listing markers */}
              {filteredListings.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => setSelectedListing(listing.id)}
                  onMouseEnter={() => setHoveredListing(listing.id)}
                  onMouseLeave={() => setHoveredListing(null)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                    selectedListing === listing.id ? 'z-20' : 'z-10'
                  }`}
                  style={{ left: `${listing.x}%`, top: `${listing.y}%` }}
                >
                  <div
                    className={`map-marker ${selectedListing === listing.id ? 'active' : ''} ${
                      hoveredListing === listing.id ? 'scale-110' : ''
                    }`}
                  >
                    {listing.type === 'Commercial' ? 'C' : listing.beds || 'R'}
                  </div>
                  
                  {/* Tooltip */}
                  {(hoveredListing === listing.id || selectedListing === listing.id) && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-lg p-3 text-left">
                      <div className="text-xs text-gray-500 mb-1">{listing.area}</div>
                      <div className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                        {listing.title}
                      </div>
                      <div className="text-[#0ea5e9] font-semibold">
                        {formatPrice(listing.price)}/mo
                      </div>
                    </div>
                  )}
                </button>
              ))}

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <div className="text-xs font-medium text-gray-700 mb-2">Legend</div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-4 h-4 bg-[#0ea5e9] rounded-full flex items-center justify-center text-white text-[8px]">R</div>
                  <span>Residential</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <div className="w-4 h-4 bg-[#ef4444] rounded-full flex items-center justify-center text-white text-[8px]">C</div>
                  <span>Commercial</span>
                </div>
              </div>
            </div>
          )}

          {/* Listings list */}
          <div className={`space-y-4 ${viewMode === 'list' ? 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6' : 'max-h-[600px] overflow-y-auto pr-2'}`}>
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className={`property-card cursor-pointer ${
                  selectedListing === listing.id ? 'ring-2 ring-[#0ea5e9]' : ''
                }`}
                onClick={() => setSelectedListing(listing.id)}
                onMouseEnter={() => setHoveredListing(listing.id)}
                onMouseLeave={() => setHoveredListing(null)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`tag ${listing.type === 'Commercial' ? 'tag-orange' : 'tag-blue'}`}>
                      {listing.type}
                    </span>
                    {listing.featured && (
                      <span className="tag tag-green">Featured</span>
                    )}
                  </div>
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                    <span className="font-semibold text-gray-900">{formatPrice(listing.price)}</span>
                    <span className="text-gray-500 text-sm">/mo</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-500">{listing.area}</p>
                    </div>
                  </div>

                  {listing.type !== 'Commercial' && (
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{listing.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{listing.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{listing.sqft.toLocaleString()} ft²</span>
                      </div>
                    </div>
                  )}

                  {listing.type === 'Commercial' && (
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{listing.sqft.toLocaleString()} ft²</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No listings match your filters</p>
                <button
                  onClick={() => {
                    setFilterArea('All areas');
                    setFilterType('All types');
                  }}
                  className="text-[#0ea5e9] hover:underline mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Listing detail modal */}
      {selectedListing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedListing(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const listing = listings.find((l) => l.id === selectedListing);
              if (!listing) return null;
              return (
                <>
                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedListing(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className={`tag ${listing.type === 'Commercial' ? 'tag-orange' : 'tag-blue'}`}>
                        {listing.type}
                      </span>
                      {listing.featured && (
                        <span className="tag tag-green">Featured</span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {listing.title}
                        </h2>
                        <p className="text-gray-500">{listing.area}, Roatán</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#0ea5e9]">
                          {formatPrice(listing.price)}
                        </div>
                        <div className="text-gray-500">per month</div>
                      </div>
                    </div>

                    {listing.type !== 'Commercial' && (
                      <div className="flex items-center gap-6 py-4 border-y border-gray-100 mb-4">
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <Bed className="w-5 h-5" />
                            {listing.beds}
                          </div>
                          <div className="text-sm text-gray-500">Bedrooms</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200" />
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <Bath className="w-5 h-5" />
                            {listing.baths}
                          </div>
                          <div className="text-sm text-gray-500">Bathrooms</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200" />
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <Square className="w-5 h-5" />
                            {listing.sqft.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">Sq ft</div>
                        </div>
                      </div>
                    )}

                    {listing.type === 'Commercial' && (
                      <div className="flex items-center gap-6 py-4 border-y border-gray-100 mb-4">
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-gray-900 font-semibold">
                            <Square className="w-5 h-5" />
                            {listing.sqft.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">Square feet</div>
                        </div>
                      </div>
                    )}

                    <p className="text-gray-600 mb-6">
                      This beautiful {listing.type.toLowerCase()} in {listing.area} offers 
                      stunning views and easy access to local amenities. Perfect for 
                      long-term stays on the island.
                    </p>

                    <div className="flex gap-3">
                      <button className="btn-primary flex-1">
                        Request a tour
                      </button>
                      <button className="btn-secondary flex-1">
                        Contact agent
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default MapListings;
