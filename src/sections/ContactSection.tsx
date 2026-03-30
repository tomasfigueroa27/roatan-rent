import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Panels animation
      if (panelsRef.current) {
        const panels = panelsRef.current.querySelectorAll('.contact-panel');
        gsap.fromTo(
          panels,
          { y: 80, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panelsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Form fields animation
        const fields = panelsRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          fields,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panelsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you within one business day.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0B3C3C] py-24 lg:py-32"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-[-0.03em] text-[#F4F2EE] mb-4">
            Ready to rent?
          </h2>
          <p className="text-[#F4F2EE]/70 text-lg leading-relaxed">
            Tell us what you're looking for. We'll reply within one business day.
          </p>
        </div>

        {/* Contact panels */}
        <div
          ref={panelsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {/* Left panel - Contact info */}
          <div className="contact-panel bg-[#F4F2EE]/6 backdrop-blur-sm border border-[#F4F2EE]/10 rounded-[28px] p-8 lg:p-10">
            <h3 className="font-display font-bold text-xl text-[#F4F2EE] mb-6">
              Get in touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4A03A]/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <span className="text-sm text-[#F4F2EE]/60 block">Email</span>
                  <a
                    href="mailto:hello@roatan.rent"
                    className="text-[#F4F2EE] hover:text-[#D4A03A] transition-colors"
                  >
                    hello@roatan.rent
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4A03A]/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <span className="text-sm text-[#F4F2EE]/60 block">Phone</span>
                  <a
                    href="tel:+50412345678"
                    className="text-[#F4F2EE] hover:text-[#D4A03A] transition-colors"
                  >
                    +504 1234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4A03A]/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#D4A03A]" />
                </div>
                <div>
                  <span className="text-sm text-[#F4F2EE]/60 block">Location</span>
                  <span className="text-[#F4F2EE]">
                    Roatán, Bay Islands, Honduras
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/50412345678"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full btn-gold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Message on WhatsApp
            </a>
          </div>

          {/* Right panel - Form */}
          <div className="contact-panel bg-[#F4F2EE]/6 backdrop-blur-sm border border-[#F4F2EE]/10 rounded-[28px] p-8 lg:p-10">
            <h3 className="font-display font-bold text-xl text-[#F4F2EE] mb-6">
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#F4F2EE]/10 border border-[#F4F2EE]/20 rounded-xl px-4 py-3 text-[#F4F2EE] placeholder:text-[#F4F2EE]/50 focus:outline-none focus:border-[#D4A03A]/50 transition-colors"
                  required
                />
              </div>

              <div className="form-field">
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#F4F2EE]/10 border border-[#F4F2EE]/20 rounded-xl px-4 py-3 text-[#F4F2EE] placeholder:text-[#F4F2EE]/50 focus:outline-none focus:border-[#D4A03A]/50 transition-colors"
                  required
                />
              </div>

              <div className="form-field">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-[#F4F2EE]/10 border border-[#F4F2EE]/20 rounded-xl px-4 py-3 text-[#F4F2EE] placeholder:text-[#F4F2EE]/50 focus:outline-none focus:border-[#D4A03A]/50 transition-colors"
                />
              </div>

              <div className="form-field">
                <textarea
                  placeholder="What are you looking for?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-[#F4F2EE]/10 border border-[#F4F2EE]/20 rounded-xl px-4 py-3 text-[#F4F2EE] placeholder:text-[#F4F2EE]/50 focus:outline-none focus:border-[#D4A03A]/50 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="form-field w-full btn-gold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
