import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

export const Testimonials = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { t } = useTranslation();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const testimonials = [
        {
            id: 1,
            quoteKey: "testimonials.quotes.quote1",
            name: "SARAH MITCHELL",
            company: "TechVenture Inc.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        },
        {
            id: 2,
            quoteKey: "testimonials.quotes.quote2",
            name: "JAMES RODRIGUEZ",
            company: "Luxe Brands",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        },
        {
            id: 3,
            quoteKey: "testimonials.quotes.quote3",
            name: "EMMA CHEN",
            company: "StartupFlow",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        },
        {
            id: 4,
            quoteKey: "testimonials.quotes.quote4",
            name: "MICHAEL FOSTER",
            company: "Nova Digital",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        },
    ];

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <section className="py-16 md:py-28 bg-background">
            <div ref={ref} className="container-custom">
                {/* Section Header */}
                <div className={`text-center mb-10 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
                    <p className="section-subheader mb-4 md:mb-6">
                        ● {t("testimonials.subtitle")}
                    </p>
                    <h2 className="section-main-header text-[28px] md:text-[45px]">
                        {t("testimonials.title")}
                    </h2>
                </div>

                {/* Testimonials Carousel */}
                <div className={`overflow-hidden ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`} ref={emblaRef}>
                    <div className="flex gap-4 md:gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="flex-shrink-0 w-[calc(100%-40px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Modern Glass Card */}
                                <div
                                    className={`relative p-6 md:p-8 pt-6 md:pt-8 pb-24 md:pb-28 h-full rounded-2xl transition-all duration-500 border ${
                                        hoveredCard === index
                                            ? 'bg-foreground border-accent/30 shadow-2xl shadow-foreground/20 -translate-y-2'
                                            : 'bg-secondary/80 border-transparent hover:border-accent/10'
                                    }`}
                                >
                                    {/* Quote Icon */}
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                                            hoveredCard === index ? 'bg-accent' : 'bg-foreground'
                                        }`}
                                    >
                                        <Quote
                                            className={`w-5 h-5 transition-colors duration-300 ${
                                                hoveredCard === index ? 'text-accent-foreground' : 'text-background'
                                            }`}
                                        />
                                    </div>

                                    <p
                                        className={`text-sm md:text-[15px] leading-relaxed transition-colors duration-300 ${
                                            hoveredCard === index ? 'text-background/80' : 'text-muted-foreground'
                                        }`}
                                    >
                                        "{t(testimonial.quoteKey)}"
                                    </p>

                                    {/* Star rating */}
                                    <div className="flex gap-1 mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-sm transition-colors duration-300 ${
                                                    hoveredCard === index ? 'text-accent' : 'text-accent/70'
                                                }`}
                                            >
                        ★
                      </span>
                                        ))}
                                    </div>

                                    {/* Bottom accent line */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-b-2xl transition-all duration-500 ${
                                            hoveredCard === index ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                </div>

                                {/* Client info with modern styling */}
                                <div className={`relative -mt-[55px] flex items-center gap-3 px-4 transition-opacity duration-300 ${
                                    hoveredCard === index ? 'opacity-0' : 'opacity-100'
                                }`}>
                                    <div className="relative">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-full object-cover transition-all duration-300 ${
                                                hoveredCard === index ? 'grayscale-0 ring-2 ring-accent ring-offset-2 ring-offset-background' : 'grayscale'
                                            }`}
                                        />
                                        {/* Online indicator */}
                                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full border-2 border-background" />
                                    </div>
                                    <div>
                                        <h4
                                            className={`font-display text-xs md:text-sm tracking-wide transition-colors duration-300 ${
                                                hoveredCard === index ? 'text-foreground' : 'text-foreground'
                                            }`}
                                        >
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-[10px] md:text-xs text-muted-foreground">
                                            {t("testimonials.position")}, {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modern Pagination Dots */}
                <div className={`flex justify-center gap-2 md:gap-3 mt-8 md:mt-12 ${isVisible ? "animate-fade-up delay-300" : "opacity-0"}`}>
                    {scrollSnaps.slice(0, 3).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`transition-all duration-300 rounded-full ${
                                selectedIndex === index
                                    ? 'w-8 h-2 bg-accent'
                                    : 'w-2 h-2 bg-border hover:bg-muted-foreground'
                            }`}
                        />
                    ))}
                </div>

                {/* Decorative Line */}
                <div className={`flex justify-center mt-10 md:mt-16 ${isVisible ? "animate-fade-up delay-400" : "opacity-0"}`}>
                    <div className="w-px h-12 md:h-16 bg-accent" />
                </div>
            </div>
        </section>
    );
};