import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Wrench, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, label: 'Utilities guidance' },
  { icon: Wrench, label: 'Maintenance support' },
  { icon: Calendar, label: 'Flexible viewing' },
];

const TenantTools = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Card enters from right
      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Image enters from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-40vw', scale: 1.08, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Text block enters with stagger
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.animate-item');
        scrollTl.fromTo(
          textElements,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.08
        );
      }

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.animate-item');
        scrollTl.fromTo(
          textElements,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#F4F2EE] flex items-center justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/tools_palm_canopy.jpg"
          alt="Palm canopy"
          className="w-full h-full object-cover img-warm"
        />
        <div className="vignette" />
      </div>

      {/* Feature Card */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[18vh] w-[88vw] h-[64vh] bg-[#F4F2EE] rounded-[28px] card-shadow z-[4] overflow-hidden"
      >
        {/* Left image */}
        <div
          ref={imageRef}
          className="absolute left-0 top-0 w-[56%] h-full"
        >
          <img
            src="/tools_beach_road.jpg"
            alt="Beach road"
            className="w-full h-full object-cover img-warm"
          />
        </div>

        {/* Right content */}
        <div
          ref={textRef}
          className="absolute right-0 top-0 w-[44%] h-full p-8 lg:p-12 flex flex-col justify-center"
        >
          {/* Title */}
          <h2 className="animate-item font-display font-black text-[clamp(1.75rem,3vw,3rem)] leading-tight tracking-[-0.03em] text-[#1A1A1A] mb-4">
            Live here like a local
          </h2>

          {/* Description */}
          <p className="animate-item text-[#6E6E6E] leading-relaxed mb-8 max-w-sm">
            Reliable utilities, maintenance support, and a lease structure
            designed for long-term stays.
          </p>

          {/* Feature chips */}
          <div className="animate-item flex flex-wrap gap-3 mb-8">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl card-shadow"
              >
                <feature.icon className="w-5 h-5 text-[#D4A03A]" />
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="animate-item btn-gold w-fit flex items-center gap-2 group">
            See tenant FAQs
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TenantTools;
