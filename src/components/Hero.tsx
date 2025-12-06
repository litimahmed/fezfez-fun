/**
 * @file Hero.tsx
 * @description Enterprise-level hero section with professional corporate design
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import heroImage from "@/assets/hero-queue-management.png";

const Hero = () => {
  const { t, isRTL } = useTranslation();

  const features = [
    { text: t("hero.feature1") || "Smart Queue Management" },
    { text: t("hero.feature2") || "Real-time Analytics" },
    { text: t("hero.feature3") || "Multi-location Support" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className={`text-center lg:text-${isRTL ? 'right' : 'left'}`}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {t("hero.badge") || "Enterprise Queue Management"}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              {t("hero.title")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" className="group shadow-elegant">
                {t("hero.cta")}
                <motion.div
                  className={isRTL ? 'mr-2' : 'ml-2'}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                {t("hero.watchDemo") || "Watch Demo"}
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 pt-8 border-t border-border/50"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground">{t("hero.stat1") || "Active Clients"}</p>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">2M+</p>
                  <p className="text-xs text-muted-foreground">{t("hero.stat2") || "Tickets Processed"}</p>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">99.9%</p>
                  <p className="text-xs text-muted-foreground">{t("hero.stat3") || "Uptime"}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Image Container with Shadow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform rotate-2" />
              <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card">
                <img
                  src={heroImage}
                  alt="Queue management and reservation platform interface"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Live Processing</p>
                    <p className="text-xs text-muted-foreground">847 customers in queue</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
