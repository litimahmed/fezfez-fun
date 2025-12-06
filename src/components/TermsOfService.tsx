/**
 * @file TermsOfService.tsx
 * @description Enterprise-level Terms of Service section with professional design and proper empty states
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { useTermsOfService } from "@/hooks/useTermsOfService";
import { Skeleton } from "@/components/ui/skeleton";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeader from "@/components/home/SectionHeader";
import EmptyState from "@/components/home/EmptyState";

const TermsOfService = () => {
  const { t, language } = useTranslation();
  const { data: termsData, isLoading } = useTermsOfService();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      continueReading: {
        en: "Continue reading",
        fr: "Continuer la lecture",
        ar: "متابعة القراءة"
      },
      description: {
        en: "By using our services, you agree to these terms. Please read them carefully to understand your rights and responsibilities.",
        fr: "En utilisant nos services, vous acceptez ces conditions. Veuillez les lire attentivement pour comprendre vos droits et responsabilités.",
        ar: "باستخدام خدماتنا، فإنك توافق على هذه الشروط. يرجى قراءتها بعناية لفهم حقوقك ومسؤولياتك."
      },
      readMore: {
        en: "Read Full Terms",
        fr: "Lire les conditions complètes",
        ar: "اقرأ الشروط الكاملة"
      },
      emptyTitle: {
        en: "Terms of Service",
        fr: "Conditions d'utilisation",
        ar: "شروط الخدمة"
      },
      emptyDescription: {
        en: "Our terms of service outline the rules and guidelines for using our platform. Full document coming soon.",
        fr: "Nos conditions d'utilisation décrivent les règles et directives pour l'utilisation de notre plateforme. Document complet à venir.",
        ar: "تحدد شروط الخدمة الخاصة بنا القواعد والإرشادات لاستخدام منصتنا. الوثيقة الكاملة قريباً."
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
    if (!termsData?.contenu) return [];
    if (Array.isArray(termsData.contenu)) {
      return termsData.contenu.filter(section => section.type === 'section').slice(0, 3);
    }
    return [];
  };

  const apiSections = getContentSections();
  const termsFeatures = apiSections.map((section, index) => ({
    id: `section-${index}`,
    title: getTranslated(section.titre),
    description: getTranslated(section.paragraphe)
  }));

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const hasContent = termsFeatures.length > 0;

  // Loading State
  if (isLoading) {
    return (
      <SectionContainer id="terms" variant="default">
        <SectionHeader
          icon={FileText}
          title={t("terms.title")}
          subtitle={t("terms.subtitle")}
        />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[...Array(3)].map((_, i) => (
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
    <SectionContainer id="terms" variant="default">
      <SectionHeader
        icon={FileText}
        title={t("terms.title")}
        subtitle={t("terms.subtitle")}
      />

      {/* Content Cards */}
      {hasContent ? (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {termsFeatures.map((feature, index) => (
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
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                    {truncateText(feature.description)}
                  </p>
                  
                  <Link 
                    to={`/terms-of-service#${feature.id}`}
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
            icon={Scale}
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
        <Link to="/terms-of-service">
          <Button variant="cta" size="lg" className="group">
            {getText("readMore")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </SectionContainer>
  );
};

export default TermsOfService;
