import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Users, Headphones, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Camera, text: 'Free listing with photos' },
  { icon: Users, text: 'Qualified tenant leads' },
  { icon: Headphones, text: 'Local support team' },
];

const OwnerSpotlight = () => {
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
      // Card enters from left
      scrollTl.fromTo(
        cardRef.current,
        { x: '-60vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Image enters from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '50vw', scale: 1.06, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Text block enters with stagger
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.animate-item');
        scrollTl.fromTo(
          textElements,
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        );
      }

      // Badge enters
      scrollTl.fromTo(
        badgeRef.current,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-35vh', opacity: 0, ease: 'power2.in' },
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
          { opacity: 1 },
          { opacity: 0.2, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        badgeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="list-property"
      className="section-pinned bg-[#F4F2EE] flex items-center justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="/owner_overwater_bungalow.jpg"
          alt="Overwater bungalows"
          className="w-full h-full object-cover img-warm"
        />
        <div className="vignette" />
      </div>

      {/* Floating badge */}
      <div
        ref={badgeRef}
        className="absolute left-[6vw] top-[10vh] z-[5] bg-[#D4A03A] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider"
      >
        Free listing
      </div>

      {/* Feature Card */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[18vh] w-[88vw] h-[64vh] bg-[#F4F2EE] rounded-[28px] card-shadow z-[4] overflow-hidden"
      >
        {/* Left content */}
        <div
          ref={textRef}
          className="absolute left-0 top-0 w-[48%] h-full p-8 lg:p-12 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <span className="animate-item text-eyebrow mb-4">
            For Owners
          </span>

          {/* Title */}
          <h2 className="animate-item font-display font-black text-[clamp(1.75rem,3vw,3rem)] leading-tight tracking-[-0.03em] text-[#1A1A1A] mb-4">
            List your property
          </h2>

          {/* Description */}
          <p className="animate-item text-[#6E6E6E] leading-relaxed mb-8 max-w-sm">
            Get your rental in front of serious tenants. We handle inquiries,
            schedule tours, and keep communication clear.
          </p>

          {/* Benefits list */}
          <div className="animate-item space-y-4 mb-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 bg-[#D4A03A]/10 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#D4A03A]" />
                </div>
                <span className="text-[#1A1A1A]">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="animate-item btn-gold w-fit flex items-center gap-2 group">
            Start a listing
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right image */}
        <div
          ref={imageRef}
          className="absolute right-0 top-0 w-[52%] h-full"
        >
          <img
            src="/owner_host_portrait.jpg"
            alt="Property host"
            className="w-full h-full object-cover img-warm"
          />
        </div>
      </div>
    </section>
  );
};

export default OwnerSpotlight;
