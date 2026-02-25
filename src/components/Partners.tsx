import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";

export const Partners = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();

  const keywords = t("partners.keywords", { returnObjects: true }) as string[];

  return (
    <section className="py-10 md:py-16 bg-background overflow-hidden">
      <div ref={ref} className={isVisible ? "animate-fade-up" : "opacity-0"}>
        {/* Infinite scrolling carousel */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="flex animate-carousel-scroll"
            style={{
              width: 'max-content',
            }}
          >
            {/* First set */}
            {keywords.map((keyword, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center mx-4 md:mx-8"
              >
                <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: '#101010' }}>
                  {keyword}
                </span>
                <span className="text-accent text-xl sm:text-2xl md:text-3xl lg:text-4xl mx-4 md:mx-8">★</span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {keywords.map((keyword, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center mx-4 md:mx-8"
              >
                <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: '#101010' }}>
                  {keyword}
                </span>
                <span className="text-accent text-xl sm:text-2xl md:text-3xl lg:text-4xl mx-4 md:mx-8">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
