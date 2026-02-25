import { Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";

const tags = [
  "STRATEGY", "BRANDING", "DESIGN", "DEVELOPMENT", "MARKETING", 
  "UX/UI", "E-COMMERCE", "IDENTITY", "DIGITAL"
];

export const VideoBanner = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-dark overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80"
          alt="Development team working on innovative solutions"
          className="w-full h-full object-cover opacity-50 grayscale"
        />
        <div className="absolute inset-0 bg-dark/30" />
      </div>

      {/* Background Watermark */}
      <div className="absolute bottom-20 left-0 pointer-events-none">
        <span className="text-[15vw] font-display text-light/10 whitespace-nowrap tracking-wider">
          EXPERTISE
        </span>
      </div>

      {/* CTA Button - Center */}
      <div ref={ref} className="relative z-10 flex items-center justify-center min-h-[500px]">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <button 
            onClick={() => scrollToSection('contact')}
            className="group relative w-36 h-36"
          >
            {/* Rotating Text Circle */}
            <div className="absolute inset-0 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path
                    id="videoBannerCirclePath"
                    d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  />
                </defs>
                <text className="text-[7px] fill-light uppercase tracking-[0.25em]">
                  <textPath href="#videoBannerCirclePath">
                    {t("videoBanner.circleText")}
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Center CTA Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 bg-accent border-accent flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                    <span className="text-accent-foreground font-display text-4xl font-bold">A</span>
                </div>
            </div>
          </button>
        </div>
      </div>

      {/* Scrolling Tags */}
      <div className={`relative z-10 py-6 border-t border-light/10 ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...tags, ...tags].map((tag, index) => (
              <span key={index} className="flex items-center">
                <span className="mx-6 text-sm tracking-[0.2em] text-light/80 uppercase font-medium">
                  {tag}
                </span>
                <span className="text-accent text-lg">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};