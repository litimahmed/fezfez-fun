/**
 * @file PrivacyPolicy.tsx
 * @description Enterprise-level Privacy Policy section with professional design and proper empty states
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";
import { Skeleton } from "@/components/ui/skeleton";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeader from "@/components/home/SectionHeader";
import EmptyState from "@/components/home/EmptyState";

const PrivacyPolicy = () => {
  const { t, language } = useTranslation();
  const { data: privacyData, isLoading } = usePrivacyPolicy();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      continueReading: {
        en: "Continue reading",
        fr: "Continuer la lecture",
        ar: "متابعة القراءة"
      },
      description: {
        en: "Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it.",
        fr: "Votre vie privée est importante pour nous. Nous nous engageons à protéger vos informations personnelles et à être transparents sur la façon dont nous les utilisons.",
        ar: "خصوصيتك مهمة بالنسبة لنا. نحن ملتزمون بحماية معلوماتك الشخصية والشفافية حول كيفية استخدامها."
      },
      readMore: {
        en: "Read Full Policy",
        fr: "Lire la politique complète",
        ar: "اقرأ السياسة الكاملة"
      },
      emptyTitle: {
        en: "Privacy Policy",
        fr: "Politique de confidentialité",
        ar: "سياسة الخصوصية"
      },
      emptyDescription: {
        en: "Our privacy policy details how we collect, use, and protect your data. Full policy document coming soon.",
        fr: "Notre politique de confidentialité détaille comment nous collectons, utilisons et protégeons vos données. Document complet à venir.",
        ar: "توضح سياسة الخصوصية الخاصة بنا كيفية جمع بياناتك واستخدامها وحمايتها. الوثيقة الكاملة قريباً."
      }
    };
    return texts[key]?.[language] || texts[key]?.en || "";
  };

  type Language = 'en' | 'fr' | 'ar';
  type TranslatableField = { fr?: string; ar?: string; en?: string; } | undefined | {};

  const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
    if (!field || typeof field !== 'object') return fallback;
    const translated = field[language as Language] || field['en'] || field['fr'] || field['ar'];
    return translated || fallback;
  };

  const getContentSections = () => {
    if (!privacyData?.contenu) return [];
    if (Array.isArray(privacyData.contenu)) {
      return privacyData.contenu.filter(section => section.type === 'section').slice(0, 4);
    }
    return [];
  };

  const apiSections = getContentSections();
  const privacyFeatures = apiSections.map((section, index) => ({
    id: `section-${index}`,
    title: getTranslated(section.titre),
    description: getTranslated(section.paragraphe)
  }));

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const hasContent = privacyFeatures.length > 0;

  // Loading State
  if (isLoading) {
    return (
      <SectionContainer id="privacy" variant="muted">
        <SectionHeader
          icon={Shield}
          title={t("privacy.title")}
          subtitle={t("privacy.subtitle")}
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
    <SectionContainer id="privacy" variant="muted">
      <SectionHeader
        icon={Shield}
        title={t("privacy.title")}
        subtitle={t("privacy.subtitle")}
      />

      {/* Content Cards */}
      {hasContent ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {privacyFeatures.map((feature, index) => (
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
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                    {truncateText(feature.description)}
                  </p>
                  
                  <Link 
                    to={`/privacy-policy#${feature.id}`}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                  >
                    {getText("continueReading")}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl mb-12">
          <EmptyState
            icon={Lock}
            title={getText("emptyTitle")}
            description={getText("emptyDescription")}
          />
        </div>
      )}

      {/* CTA Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto text-center"
      >
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {getText("description")}
        </p>
        <Link to="/privacy-policy">
          <Button variant="cta" size="lg" className="group">
            {getText("readMore")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </SectionContainer>
  );
};

export default PrivacyPolicy;
