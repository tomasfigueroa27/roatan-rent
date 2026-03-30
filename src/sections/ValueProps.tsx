import { Check, Shield, Clock, MapPin } from 'lucide-react';

const values = [
  {
    icon: Check,
    title: 'Verified listings',
    description: 'Every property is personally verified with real photos and accurate details.',
  },
  {
    icon: Shield,
    title: 'Local support',
    description: 'Our team lives on the island and is here to help you every step of the way.',
  },
  {
    icon: Clock,
    title: 'Flexible terms',
    description: 'From 3-month stays to annual leases, find terms that work for you.',
  },
  {
    icon: MapPin,
    title: 'Island expertise',
    description: 'We know every neighborhood and can help you find your perfect spot.',
  },
];

const ValueProps = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why rent with us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're locals who understand the Roatán rental market. 
              Let us help you find your perfect home on the island.
            </p>
          </div>

          {/* Value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-sky-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <value.icon className="w-6 h-6 text-[#0ea5e9]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
