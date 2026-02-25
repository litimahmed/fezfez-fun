import { Check, Zap, Crown, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";

const packages = [
  {
    icon: Zap,
    nameKey: "packages.items.starter.name",
    priceKey: "packages.items.starter.price",
    descriptionKey: "packages.items.starter.description",
    features: [
      "packages.items.starter.features.f1",
      "packages.items.starter.features.f2",
      "packages.items.starter.features.f3",
      "packages.items.starter.features.f4",
    ],
    popular: false,
  },
  {
    icon: Crown,
    nameKey: "packages.items.professional.name",
    priceKey: "packages.items.professional.price",
    descriptionKey: "packages.items.professional.description",
    features: [
      "packages.items.professional.features.f1",
      "packages.items.professional.features.f2",
      "packages.items.professional.features.f3",
      "packages.items.professional.features.f4",
      "packages.items.professional.features.f5",
    ],
    popular: true,
  },
  {
    icon: Rocket,
    nameKey: "packages.items.enterprise.name",
    priceKey: "packages.items.enterprise.price",
    descriptionKey: "packages.items.enterprise.description",
    features: [
      "packages.items.enterprise.features.f1",
      "packages.items.enterprise.features.f2",
      "packages.items.enterprise.features.f3",
      "packages.items.enterprise.features.f4",
      "packages.items.enterprise.features.f5",
      "packages.items.enterprise.features.f6",
    ],
    popular: false,
  },
];

export const Packages = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();

  return (
    <section id="packages" className="py-16 md:py-28 bg-secondary">
      <div ref={ref} className="container-custom">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="section-subheader mb-4">
            ● {t("packages.subtitle")}
          </p>
          <h2 className="section-main-header text-[28px] md:text-[45px] mb-4">
            {t("packages.titleStart")} <span className="text-accent">{t("packages.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("packages.description")}
          </p>
        </div>

        {/* Packages Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`group relative bg-background rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular ? 'ring-2 ring-accent shadow-xl shadow-accent/10' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-xs font-display uppercase tracking-wider px-4 py-1.5 rounded-full">
                    {t("packages.popular")}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                pkg.popular ? 'bg-accent' : 'bg-foreground group-hover:bg-accent'
              }`}>
                <pkg.icon className={`w-6 h-6 transition-colors duration-300 ${
                  pkg.popular ? 'text-accent-foreground' : 'text-background group-hover:text-accent-foreground'
                }`} />
              </div>

              {/* Package Name */}
              <h3 className="text-xl md:text-2xl font-display uppercase mb-2 text-foreground">
                {t(pkg.nameKey)}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl md:text-4xl font-display text-accent">
                  {t(pkg.priceKey)}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
                {t(pkg.descriptionKey)}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-foreground text-sm">{t(feature)}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-3 rounded-xl font-display uppercase tracking-wider text-sm transition-all duration-300 ${
                pkg.popular 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                  : 'bg-foreground text-background hover:bg-accent hover:text-accent-foreground'
              }`}>
                {t("packages.cta")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};