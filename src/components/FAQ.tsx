import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { questionKey: "faq.items.q1.question", answerKey: "faq.items.q1.answer" },
    { questionKey: "faq.items.q2.question", answerKey: "faq.items.q2.answer" },
    { questionKey: "faq.items.q3.question", answerKey: "faq.items.q3.answer" },
    { questionKey: "faq.items.q4.question", answerKey: "faq.items.q4.answer" },
    { questionKey: "faq.items.q5.question", answerKey: "faq.items.q5.answer" },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-28 bg-background">
      <div ref={ref} className="container-custom">
        {/* Decorative Line */}
        <div className={`flex justify-center mb-10 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="w-px h-12 md:h-16 bg-accent" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column - Title */}
          <div className={`lg:col-span-4 text-center lg:text-left ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className="section-subheader mb-4">
              ● {t("faq.subtitle")}
            </p>
            <h2 className="section-main-header text-[28px] md:text-[45px] mb-4 md:mb-6">
              {t("faq.title")}
            </h2>
            <p className="section-paragraph mb-6 md:mb-8">
              {t("faq.description")}
            </p>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className={`lg:col-span-8 ${isVisible ? "animate-fade-up delay-200" : "opacity-0"}`}>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`group rounded-2xl overflow-hidden transition-all duration-500 ${
                    openIndex === index 
                      ? 'bg-foreground' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span 
                        className={`text-xs md:text-sm font-display tracking-wider transition-colors duration-300 ${
                          openIndex === index ? 'text-accent' : 'text-muted-foreground'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 
                        className={`text-sm md:text-base font-display tracking-wide transition-colors duration-300 ${
                          openIndex === index ? 'text-background' : 'text-foreground'
                        }`}
                      >
                        {t(item.questionKey)}
                      </h3>
                    </div>
                    <div 
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        openIndex === index 
                          ? 'bg-accent' 
                          : 'bg-foreground group-hover:bg-accent'
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus className={`w-4 h-4 md:w-5 md:h-5 ${openIndex === index ? 'text-accent-foreground' : 'text-background'}`} />
                      ) : (
                        <Plus className="w-4 h-4 md:w-5 md:h-5 text-background group-hover:text-accent-foreground" />
                      )}
                    </div>
                  </button>
                  
                  {/* Answer Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="pl-8 md:pl-12 border-l-2 border-accent/30">
                        <p className="text-background/70 text-sm md:text-base leading-relaxed">
                          {t(item.answerKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
