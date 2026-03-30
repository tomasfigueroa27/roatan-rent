import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bed, Bath, Square, Sofa, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedResidential = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        );
      }

      // Badge enters
      scrollTl.fromTo(
        badgeRef.current,
        { y: '-6vh', scale: 0.9, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Hold - subtle parallax on image
      scrollTl.fromTo(
        imageRef.current,
        { y: 0 },
        { y: '-2vh', ease: 'none' },
        0.3
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.animate-item');
        scrollTl.fromTo(
          textElements,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        badgeRef.current,
        { y: 0, opacity: 1 },
        { y: '-4vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rentals"
      className="section-pinned bg-[#F4F2EE] flex items-center justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/featured_home_exterior.jpg"
          alt="Tropical home"
          className="w-full h-full object-cover img-warm"
        />
        <div className="vignette" />
      </div>

      {/* Floating badge */}
      <div
        ref={badgeRef}
        className="absolute right-[4vw] top-[10vh] z-[5] bg-[#D4A03A] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider"
      >
        New listing
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
            src="/featured_home_exterior.jpg"
            alt="Sandy Bay House"
            className="w-full h-full object-cover img-warm"
          />
        </div>

        {/* Right content */}
        <div
          ref={textRef}
          className="absolute right-0 top-0 w-[44%] h-full p-8 lg:p-12 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <span className="animate-item text-eyebrow mb-4">
            Featured Residential
          </span>

          {/* Title */}
          <h2 className="animate-item font-display font-black text-[clamp(1.75rem,3vw,3rem)] leading-tight tracking-[-0.03em] text-[#1A1A1A] mb-4">
            Sandy Bay House
          </h2>

          {/* Description */}
          <p className="animate-item text-[#6E6E6E] leading-relaxed mb-6 max-w-sm">
            Four-bedroom home with a pool, outdoor kitchen, and covered terrace.
            Quiet cul-de-sac, 5 minutes to the beach.
          </p>

          {/* Specs */}
          <div className="animate-item flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-[#1A1A1A]">
              <Bed className="w-4 h-4 text-[#D4A03A]" />
              <span>4 bd</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1A1A1A]">
              <Bath className="w-4 h-4 text-[#D4A03A]" />
              <span>3 ba</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1A1A1A]">
              <Square className="w-4 h-4 text-[#D4A03A]" />
              <span>2,400 ft²</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1A1A1A]">
              <Sofa className="w-4 h-4 text-[#D4A03A]" />
              <span>Furnished</span>
            </div>
          </div>

          {/* Price */}
          <div className="animate-item mb-6">
            <span className="font-display font-bold text-2xl text-[#1A1A1A]">
              $2,400
            </span>
            <span className="text-[#6E6E6E] ml-1">/ month</span>
          </div>

          {/* CTA */}
          <button className="animate-item btn-gold w-fit flex items-center gap-2 group">
            Request a tour
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResidential;
