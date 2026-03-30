import { Search, MessageSquare, FileCheck, Key } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse listings',
    description: 'Explore our verified properties on the map or filter by area, type, and price.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Get in touch',
    description: 'Contact us to schedule a viewing or ask questions about any property.',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Review terms',
    description: 'We provide clear lease terms with no hidden fees or surprises.',
  },
  {
    number: '04',
    icon: Key,
    title: 'Move in',
    description: 'Sign the lease and get your keys. Welcome to your new home!',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting in Roatán is simple. Follow these steps to find your perfect home.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-200" />
                )}

                <div className="text-center">
                  {/* Number */}
                  <div className="text-5xl font-bold text-gray-100 mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-[#0ea5e9]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#map" className="btn-primary inline-flex items-center gap-2">
              Start browsing
              <Search className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
