import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";

export const Hero = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { t } = useTranslation();

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Creative workspace with design materials"
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/40" />
            </div>

            {/* Content */}
            <div ref={ref} className="relative z-10 container-custom py-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="pt-10 lg:pt-20 text-center lg:text-left">
                        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
                            <p className="text-accent text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
                                ● {t("hero.subtitle")}
                            </p>
                        </div>

                        <h1
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-display text-light leading-[1.05] mb-8 md:mb-10 ${
                                isVisible ? "animate-fade-up delay-100" : "opacity-0"
                            }`}
                        >
                            {t("hero.title1")}<br />
                            {t("hero.title2")}
                        </h1>

                        <div className={`${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
                            <button
                                onClick={scrollToContact}
                                className="border border-accent/50 text-light hover:bg-accent hover:text-accent-foreground hover:border-accent rounded-full px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-xs tracking-[0.15em] uppercase transition-all duration-300 bg-transparent"
                            >
                                {t("hero.button")}
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Scroll Down Indicator */}
                    <div
                        className={`hidden lg:flex justify-center lg:justify-end items-center min-h-[200px] md:min-h-[300px] ${
                            isVisible ? "animate-fade-up delay-300" : "opacity-0"
                        }`}
                    >
                        <button
                            onClick={scrollToAbout}
                            className="group relative w-32 h-32 md:w-40 md:h-40"
                        >
                            {/* Rotating Text Circle */}
                            <div className="absolute inset-0 animate-spin-slow">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <defs>
                                        <path
                                            id="circlePath"
                                            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                                        />
                                    </defs>
                                    <text className="text-[7px] fill-light/70 uppercase tracking-[0.25em]">
                                        <textPath href="#circlePath">
                                            {t("hero.circleText")}
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                            {/* Center Scroll Down Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 bg-accent border-accent flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                                    <span className="text-accent-foreground font-display text-4xl font-bold">A</span>
                                </div>
                            </div>
                        </button>
                    </div>      
                </div>
            </div>
        </section>
    );
};