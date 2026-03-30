import { useState } from 'react';
import { Bed, Bath, Square, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const featuredListings = [
  {
    id: 1,
    title: 'Luxury Beachfront Villa',
    location: 'West Bay',
    price: 2800,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: '/featured_home_exterior.jpg',
    description: 'Stunning beachfront property with private pool and ocean views.',
  },
  {
    id: 2,
    title: 'Modern Ocean View Condo',
    location: 'West End',
    price: 1500,
    beds: 2,
    baths: 2,
    sqft: 950,
    image: '/property_condo_1.jpg',
    description: 'Contemporary condo steps from the beach with resort amenities.',
  },
  {
    id: 3,
    title: 'Cozy Garden Apartment',
    location: 'Sandy Bay',
    price: 900,
    beds: 1,
    baths: 1,
    sqft: 600,
    image: '/property_apartment_1.jpg',
    description: 'Charming apartment surrounded by tropical gardens.',
  },
  {
    id: 4,
    title: 'Prime Retail Location',
    location: 'French Harbour',
    price: 2000,
    beds: 0,
    baths: 1,
    sqft: 1200,
    image: '/featured_commercial_retail.jpg',
    description: 'High-traffic retail space in the heart of French Harbour.',
    type: 'commercial',
  },
];

const FeaturedProperties = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredListings.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredListings.length) % featuredListings.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="listings" className="section-padding bg-white">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Featured listings
            </h2>
            <p className="text-gray-600">
              Hand-picked properties available now
            </p>
          </div>
          <a
            href="#map"
            className="flex items-center gap-2 text-[#0ea5e9] font-medium hover:underline"
          >
            View all listings
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <div key={listing.id} className="property-card group">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="font-semibold text-gray-900">{formatPrice(listing.price)}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{listing.location}</p>
                
                {!listing.type && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {listing.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> {listing.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" /> {listing.sqft.toLocaleString()}
                    </span>
                  </div>
                )}
                
                {listing.type && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" /> {listing.sqft.toLocaleString()} ft²
                    </span>
                    <span className="tag tag-orange text-xs">Commercial</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredListings.map((listing) => (
                <div key={listing.id} className="w-full flex-shrink-0">
                  <div className="property-card">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="font-semibold text-gray-900 text-lg">{formatPrice(listing.price)}</span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {listing.title}
                      </h3>
                      <p className="text-gray-500 mb-4">{listing.location}</p>
                      
                      {!listing.type && (
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" /> {listing.beds} bd
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4" /> {listing.baths} ba
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="w-4 h-4" /> {listing.sqft.toLocaleString()} ft²
                          </span>
                        </div>
                      )}
                      
                      {listing.type && (
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Square className="w-4 h-4" /> {listing.sqft.toLocaleString()} ft²
                          </span>
                          <span className="tag tag-orange">Commercial</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredListings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#0ea5e9]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
