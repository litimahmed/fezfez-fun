/**
 * @file AboutUs.tsx
 * @description Enterprise-level About Us section with professional design and proper empty states
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Heart, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { useAboutUs } from "@/hooks/useAboutUs";
import { Skeleton } from "@/components/ui/skeleton";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeader from "@/components/home/SectionHeader";
import EmptyState from "@/components/home/EmptyState";
import ContentCard from "@/components/home/ContentCard";

const AboutUs = () => {
  const { t, language } = useTranslation();
  const { data: aboutData, isLoading } = useAboutUs();

  const getTranslated = (field: { lang: string; value: string }[] | undefined): string => {
    if (!field || !Array.isArray(field)) return '';
    const entry = field.find(item => item.lang === language) || field.find(item => item.lang === 'fr');
    return entry?.value || '';
  };

  const MAX_LENGTH = 150;

  const truncateText = (text: string): string => {
    if (!text || text.length <= MAX_LENGTH) return text;
    return text.substring(0, MAX_LENGTH).trim() + '...';
  };

  const isTextTruncated = (text: string): boolean => {
    return text && text.length > MAX_LENGTH;
  };

  const features = [
    { 
      icon: Target, 
      title: t("about.mission") || "Notre Mission",
      fullText: aboutData ? getTranslated(aboutData.mission) : ''
    },
    { 
      icon: Eye, 
      title: t("about.vision") || "Notre Vision",
      fullText: aboutData ? getTranslated(aboutData.vision) : ''
    },
    { 
      icon: Heart, 
      title: t("about.values") || "Nos Valeurs",
      fullText: aboutData ? getTranslated(aboutData.valeurs) : ''
    },
    { 
      icon: Users, 
      title: t("about.whoWeServe") || "Qui Nous Servons",
      fullText: aboutData ? getTranslated(aboutData.qui_nous_servons) : ''
    }
  ];

  const hasContent = aboutData && features.some(f => f.fullText);

  // Loading State
  if (isLoading) {
    return (
      <SectionContainer id="about" variant="gradient">
        <SectionHeader
          badge={t("about.tagline")}
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6">
              <Skeleton className="w-12 h-12 rounded-xl mb-4" />
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="about" variant="gradient">
      <SectionHeader
        badge={t("about.tagline")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      {/* Content Cards */}
      {hasContent ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {truncateText(feature.fullText)}
                  </p>
                  
                  {isTextTruncated(feature.fullText) && (
                    <Link 
                      to="/about-us" 
                      className="inline-flex items-center gap-1 mt-4 text-primary text-sm font-medium hover:underline"
                    >
                      {t("about.learnMore") || "En savoir plus"}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl mb-12">
          <EmptyState
            icon={Info}
            title={t("about.emptyTitle") || "About Our Company"}
            description={t("about.emptyDescription") || "Learn about our mission, vision, and values. Content is being prepared for you."}
          />
        </div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Link to="/about-us">
          <Button variant="cta" size="lg" className="group">
            {t("about.readMore")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </SectionContainer>
  );
};

export default AboutUs;
