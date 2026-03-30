import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const areas = [
  { name: 'West End', description: 'Dive-town energy' },
  { name: 'West Bay', description: 'Beachfront living' },
  { name: 'Sandy Bay', description: 'Quiet residential' },
  { name: 'French Harbour', description: 'Fishing & marina' },
  { name: 'Pristine Bay / Coral View', description: 'Gated community' },
];

const Neighborhoods = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const arrowBtnRef = useRef<HTMLButtonElement>(null);

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
      // Card enters from bottom
      scrollTl.fromTo(
        cardRef.current,
        { y: '100vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Map enters from right
      scrollTl.fromTo(
        mapRef.current,
        { x: '50vw', scale: 1.06, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // List items enter with stagger
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.area-item');
        scrollTl.fromTo(
          items,
          { x: '-6vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        );
      }

      // Arrow button enters
      scrollTl.fromTo(
        arrowBtnRef.current,
        { scale: 0.6, rotation: -10, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold - subtle float on arrow button
      // (handled by CSS animation)

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-40vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        mapRef.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.area-item');
        scrollTl.fromTo(
          items,
          { opacity: 1 },
          { opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        arrowBtnRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.8, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="neighborhoods"
      className="section-pinned bg-[#F4F2EE] flex items-center justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/neighborhoods_dock.jpg"
          alt="Roatán dock"
          className="w-full h-full object-cover img-warm"
        />
        <div className="vignette" />
      </div>

      {/* Floating arrow button */}
      <button
        ref={arrowBtnRef}
        className="absolute right-[3.5vw] top-1/2 -translate-y-1/2 z-[5] w-14 h-14 bg-[#D4A03A] rounded-full flex items-center justify-center text-white card-shadow hover:scale-110 transition-transform animate-float"
        aria-label="Open map"
      >
        <MapPin className="w-6 h-6" />
      </button>

      {/* Neighborhoods Card */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[18vh] w-[88vw] h-[64vh] bg-[#F4F2EE] rounded-[28px] card-shadow z-[4] overflow-hidden"
      >
        {/* Left content */}
        <div className="absolute left-0 top-0 w-[48%] h-full p-8 lg:p-12 flex flex-col justify-center">
          {/* Header */}
          <h2 className="font-display font-black text-[clamp(2rem,3.5vw,3.5rem)] leading-tight tracking-[-0.03em] text-[#1A1A1A] mb-4">
            Pick a neighborhood
          </h2>
          <p className="text-[#6E6E6E] leading-relaxed mb-8 max-w-sm">
            From dive-town energy to gated calm—find the side of the island
            that fits your rhythm.
          </p>

          {/* Area list */}
          <div ref={listRef} className="space-y-3">
            {areas.map((area) => (
              <button
                key={area.name}
                className="area-item w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-[#D4A03A]/5 transition-colors group text-left"
              >
                <div>
                  <span className="font-semibold text-[#1A1A1A] group-hover:text-[#D4A03A] transition-colors">
                    {area.name}
                  </span>
                  <span className="text-sm text-[#6E6E6E] ml-2">
                    {area.description}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6E6E6E] group-hover:text-[#D4A03A] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {/* See all link */}
          <button className="mt-6 flex items-center gap-2 text-[#D4A03A] font-semibold hover:underline underline-offset-4">
            See all areas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right map */}
        <div
          ref={mapRef}
          className="absolute right-0 top-0 w-[52%] h-full"
        >
          <img
            src="/neighborhoods_map.jpg"
            alt="Island map"
            className="w-full h-full object-cover"
          />
          {/* Map overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#F4F2EE]/20" />
        </div>
      </div>
    </section>
  );
};

export default Neighborhoods;
