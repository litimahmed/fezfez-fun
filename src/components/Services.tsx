import { Globe, ShoppingCart, Settings, ArrowUpRight, Sparkles, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Services = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const services = [
    {
      titleKey: "services.items.digitalMarketing.title",
      descKey: "services.items.digitalMarketing.description",
      icon: Globe,
    },
    {
      titleKey: "services.items.ecommerce.title",
      descKey: "services.items.ecommerce.description",
      icon: ShoppingCart,
    },
    {
      titleKey: "services.items.branding.title",
      descKey: "services.items.branding.description",
      icon: Sparkles,
    },
    {
      titleKey: "services.items.webDesign.title",
      descKey: "services.items.webDesign.description",
      icon: Settings,
    },
    {
      titleKey: "services.items.seo.title",
      descKey: "services.items.seo.description",
      icon: TrendingUp,
    },
  ];

  const displayedServices = showAll ? services : services.slice(0, 3);

  return (
    <section id="services" className="py-16 md:py-28 bg-background">
      <div ref={ref} className="container-custom">
        {/* Decorative Line Top */}
        <div className={`flex justify-center mb-10 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="w-px h-12 md:h-16 bg-accent" />
        </div>

        {/* Section Header */}
        <div className={`text-center mb-10 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="section-subheader mb-4 md:mb-6">
            ● {t("services.subtitle")}
          </p>
          <h2 className="section-main-header text-[28px] md:text-[45px]">
            {t("services.title")}
          </h2>
        </div>

        {/* Services Grid - Proper 3 column layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {displayedServices.map((service, index) => (
            <div
              key={service.titleKey}
              className="flex flex-col"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Modern Glass Card */}
              <div
                className={`relative p-6 md:p-8 pt-8 md:pt-10 pb-20 md:pb-24 flex-1 rounded-2xl transition-all duration-500 border border-transparent ${
                  hoveredCard === index 
                    ? 'bg-foreground shadow-2xl shadow-foreground/20 -translate-y-2 border-accent/20' 
                    : 'bg-secondary/80 hover:bg-secondary'
                }`}
              >
                {/* Number badge */}
                <div 
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display transition-colors duration-300 ${
                    hoveredCard === index 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-foreground/10 text-muted-foreground'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    hoveredCard === index 
                      ? 'bg-accent' 
                      : 'bg-foreground'
                  }`}
                >
                  <service.icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      hoveredCard === index 
                        ? 'text-accent-foreground' 
                        : 'text-background'
                    }`} 
                  />
                </div>

                <h3 
                  className={`text-sm md:text-base font-display mb-3 md:mb-4 tracking-wide transition-colors duration-300 ${
                    hoveredCard === index ? 'text-background' : 'text-foreground'
                  }`}
                >
                  {t(service.titleKey)}
                </h3>
                <p 
                  className={`text-sm md:text-[15px] leading-relaxed transition-colors duration-300 ${
                    hoveredCard === index ? 'text-background/70' : 'text-muted-foreground'
                  }`}
                >
                  {t(service.descKey)}
                </p>

                {/* Bottom accent line */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-b-2xl transition-all duration-500 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Floating Action Button - Inside card at bottom right */}
                <div
                  className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${
                    hoveredCard === index 
                      ? 'bg-accent scale-110 rotate-45' 
                      : 'bg-foreground hover:bg-accent'
                  }`}
                >
                  <ArrowUpRight 
                    className={`w-5 h-5 transition-all duration-300 ${
                      hoveredCard === index 
                        ? 'text-accent-foreground -rotate-45' 
                        : 'text-background'
                    }`} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className={`flex justify-center mt-12 ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 px-8 py-3 bg-transparent border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <span className="text-sm font-medium tracking-wider">
              {showAll ? t("services.showLess") : t("services.showMore")}
            </span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            ) : (
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            )}
          </button>
        </div>

        {/* Decorative Line Bottom */}
        <div className={`flex justify-center mt-10 md:mt-16 ${isVisible ? "animate-fade-up delay-400" : "opacity-0"}`}>
          <div className="w-px h-12 md:h-16 bg-accent" />
        </div>
      </div>
    </section>
  );
};