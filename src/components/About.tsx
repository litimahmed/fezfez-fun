import { Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";

export const About = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { t } = useTranslation();

    return (
        <section id="about" className="py-16 md:py-28 bg-background">
            <div ref={ref} className="container-custom">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className={`text-center lg:text-left ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
                        <p className="section-subheader mb-4 md:mb-6">
                            ● {t("about.subtitle")}
                        </p>
                        <h2 className="section-main-header text-[28px] md:text-[45px] mb-6 md:mb-8">
                            <span className="text-accent">{t("about.titleHighlight")}</span> {t("about.titleRest")}
                        </h2>
                        <p className="section-paragraph mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                            {t("about.description")}
                        </p>
                        <p className="text-base md:text-[20px] font-display uppercase mb-8 md:mb-10 tracking-[0.15em] md:tracking-[0.2em]" style={{ color: '#101010' }}>
                            {t("about.tagline1")}<br />
                            {t("about.tagline2")}
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
                            <button className="btn-primary uppercase">
                                {t("about.button")}
                            </button>
                            <a 
                                href="https://wa.me/213781913776" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group cursor-pointer"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground flex items-center justify-center transition-transform group-hover:scale-110">
                                    <Phone className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                </div>
                                <span className="text-foreground text-xs md:text-sm font-medium tracking-wide  transition-colors">+213 7 81 91 37 76</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Image without video overlay */}
                    <div className={`relative ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
                                alt="Creative team collaboration"
                                className="w-full h-[300px] md:h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            {/* Decorative accent corner */}
                            <div className="absolute bottom-0 right-0 w-20 h-20 md:w-28 md:h-28">
                                <div className="absolute bottom-4 right-4 w-full h-full border-b-2 border-r-2 border-accent rounded-br-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};