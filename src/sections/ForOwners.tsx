import { Camera, Users, Headphones, ArrowRight, Home } from 'lucide-react';

const benefits = [
  {
    icon: Camera,
    title: 'Professional photos',
    description: 'We take high-quality photos of your property at no cost.',
  },
  {
    icon: Users,
    title: 'Qualified leads',
    description: 'Connect with serious tenants looking for long-term rentals.',
  },
  {
    icon: Headphones,
    title: 'Full support',
    description: 'We handle inquiries, showings, and lease negotiations.',
  },
];

const ForOwners = () => {
  return (
    <section id="for-owners" className="section-padding bg-white">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-full mb-6">
                <Home className="w-4 h-4 text-[#0ea5e9]" />
                <span className="text-sm font-medium text-[#0ea5e9]">For property owners</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                List your property
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Get your rental in front of qualified tenants. We handle the marketing, 
                inquiries, and showings—so you don't have to. Listing is completely free.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-[#0ea5e9]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contact" className="btn-primary flex items-center justify-center gap-2">
                  List your property
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="btn-secondary flex items-center justify-center">
                  Learn more
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/owner_host_portrait.jpg"
                  alt="Property owner"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0ea5e9]">150+</div>
                    <div className="text-sm text-gray-500">Active listings</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0ea5e9]">95%</div>
                    <div className="text-sm text-gray-500">Occupancy rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForOwners;
