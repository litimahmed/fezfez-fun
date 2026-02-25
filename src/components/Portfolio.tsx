import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Import images
import mockup1 from "@/images/mockup1.png";
import mockup8 from "@/images/mockup8.png";
import mockup4 from "@/images/mockup4.png";
import mockup5 from "@/images/mockup5.jpeg";
import mockup6 from "@/images/mockup6.jpeg";

export const Portfolio = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const portfolioItems = [
    {
      id: 1,
        titleKey: "portfolio.items.web",
        categoryKey: "portfolio.categories.development",
      image: mockup1,
    },

    {
      id: 3,
      titleKey: "portfolio.items.web",
      categoryKey: "portfolio.categories.development",
      image: mockup8,
    },
    {
      id: 4,
        titleKey: "portfolio.items.web",
        categoryKey: "portfolio.categories.development",
      image: mockup4,
    },
      {
          id: 5,
          titleKey: "portfolio.items.web",
          categoryKey: "portfolio.categories.development",
          image: mockup5,
      },
      {
          id: 6,
          titleKey: "portfolio.items.web",
          categoryKey: "portfolio.categories.development",
          image: mockup6,
      },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + portfolioItems.length) % portfolioItems.length;
      items.push({ ...portfolioItems[index], position: i });
    }
    return items;
  };

  return (
    <section id="portfolio" className="py-16 md:py-28 bg-background overflow-hidden">
      <div ref={ref} className="container-custom">
        {/* Section Header */}
        <div className={`text-center mb-10 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="section-subheader mb-4 md:mb-6">
            ● {t("portfolio.subtitle")}
          </p>
          <h2 className="section-main-header text-[28px] md:text-[45px]">
            {t("portfolio.title")}
          </h2>
        </div>
      </div>

      {/* Full-width Carousel */}
      <div className={`relative ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
        {/* Mobile: Single image with arrows */}
        <div className="block md:hidden px-4">
          <div 
            className="relative overflow-hidden rounded-lg"
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <img
              src={portfolioItems[currentIndex].image}
              alt={t(portfolioItems[currentIndex].titleKey)}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <span className="inline-block bg-accent text-accent-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-2">
                ● {t(portfolioItems[currentIndex].categoryKey)}
              </span>
              <h3 className="text-light text-lg font-display tracking-wide">
                {t(portfolioItems[currentIndex].titleKey)}
              </h3>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          </div>
          {/* Mobile navigation */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-accent flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-accent-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-accent flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-accent-foreground" />
            </button>
          </div>
        </div>

        {/* Desktop: Three images with center focus */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 px-4">
          {getVisibleItems().map((item) => (
            <div
              key={`${item.id}-${item.position}`}
              className={`relative flex-shrink-0 transition-all duration-500 ${
                item.position === 0 
                  ? "w-[50%] lg:w-[60%] max-w-[900px] z-10" 
                  : "w-[20%] lg:w-[25%] max-w-[350px] opacity-60"
              }`}
              onMouseEnter={() => item.position === 0 && setIsHovered(true)}
              onMouseLeave={() => item.position === 0 && setIsHovered(false)}
            >
              <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    item.position === 0 ? "h-[350px] lg:h-[500px]" : "h-[280px] lg:h-[400px]"
                  } ${item.position !== 0 ? "grayscale" : ""}`}
                />
                {item.position === 0 && (
                  <>
                    {/* Navigation Arrows - Inside center image, visible on hover */}
                    <button
                      onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-all duration-300 z-20 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-accent-foreground" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-all duration-300 z-20 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-accent-foreground" />
                    </button>
                    
                    <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6">
                      <span className="inline-block bg-accent text-accent-foreground text-[10px] lg:text-xs tracking-[0.15em] uppercase px-3 lg:px-4 py-1.5 lg:py-2 rounded-full mb-2 lg:mb-3">
                        ● {t(item.categoryKey)}
                      </span>
                      <h3 className="text-light text-lg lg:text-2xl font-display tracking-wide">
                        {t(item.titleKey)}
                      </h3>
                    </div>
                    <div className="absolute bottom-4 lg:bottom-6 right-4 lg:right-6">
                      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isHovered ? 'bg-accent' : 'bg-foreground'
                      }`}>
                        <ArrowUpRight className={`w-5 h-5 lg:w-6 lg:h-6 ${isHovered ? 'text-accent-foreground' : 'text-background'}`} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};