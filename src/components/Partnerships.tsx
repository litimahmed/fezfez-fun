/**
 * @file Partnerships.tsx
 * @description Enterprise-level partnerships section with professional design and proper empty states
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePartners } from "@/hooks/usePartners";
import { Building2, ExternalLink, Users } from "lucide-react";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeader from "@/components/home/SectionHeader";
import EmptyState from "@/components/home/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

const Partnerships = () => {
  const { t, language } = useTranslation();
  const { data: partners, isLoading } = usePartners();

  type TranslationItem = { lang: string; value: string };
  type TranslatableField = TranslationItem[] | undefined;

  const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
    if (!field || !Array.isArray(field)) return fallback;
    const translation = field.find(item => item.lang === language)
      || field.find(item => item.lang === 'en')
      || field.find(item => item.lang === 'fr')
      || field[0];
    return translation?.value || fallback;
  };

  const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect width="200" height="150" fill="%23f3f4f6"/%3E%3Ctext x="100" y="75" text-anchor="middle" dominant-baseline="middle" font-family="system-ui" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';

  const getImageUrl = (path: string | undefined): string => {
    if (!path) return PLACEHOLDER_IMAGE;
    if (path.startsWith('http')) return path;
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
    const cleanBase = BASE_URL.replace(/\/api\/?$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  };

  const activePartners = (partners || [])
    .filter(partner => partner.actif !== false)
    .sort((a, b) => (a.priorite_affichage || 0) - (b.priorite_affichage || 0));

  // Loading State
  if (isLoading) {
    return (
      <SectionContainer id="partnerships" variant="muted">
        <SectionHeader
          icon={Building2}
          title={t("partnerships.title")}
          subtitle={t("partnerships.subtitle")}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6">
              <Skeleton className="w-full h-16 mb-3" />
              <Skeleton className="h-4 w-2/3 mx-auto" />
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  // Empty State
  if (!activePartners || activePartners.length === 0) {
    return (
      <SectionContainer id="partnerships" variant="muted">
        <SectionHeader
          icon={Building2}
          title={t("partnerships.title")}
          subtitle={t("partnerships.subtitle")}
        />
        <div className="bg-card border border-border rounded-2xl">
          <EmptyState
            icon={Users}
            title={t("partnerships.emptyTitle") || "Our Partners"}
            description={t("partnerships.emptyDescription") || "We're building partnerships with leading organizations. Check back soon to see our trusted partners."}
          />
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="partnerships" variant="muted">
      <SectionHeader
        icon={Building2}
        title={t("partnerships.title")}
        subtitle={t("partnerships.subtitle")}
      />

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {activePartners.slice(0, 8).map((partner, index) => {
          const partnerId = partner.partenaire_id || partner.id?.toString();
          const partnerName = getTranslated(partner.nom_partenaire, `Partner ${partnerId}`);
          const logoUrl = getImageUrl(partner.logo);

          return (
            <motion.div
              key={partnerId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/partner/${partnerId}`}
                className="group block bg-card border border-border hover:border-primary/30 rounded-xl p-6 transition-all duration-300 hover:shadow-card"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-full h-16 mb-4 flex items-center justify-center">
                    <img
                      src={logoUrl}
                      alt={partnerName}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.errorHandled) {
                          target.dataset.errorHandled = 'true';
                          target.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate w-full">
                    {partnerName}
                  </p>
                  <ExternalLink className="w-4 h-4 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-card border border-border rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              {t("partnerships.trusted") || "Trusted Partnerships"}
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-muted-foreground">
            {t("partnerships.serving") || "Serving millions of citizens"}
          </span>
        </div>
      </motion.div>

      {/* Infinite Scroll for larger partner list */}
      {activePartners.length > 8 && (
        <div className="mt-12 relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-6 animate-scroll-infinite">
            {Array(4).fill(activePartners).flat().map((partner, index) => {
              const partnerId = partner.partenaire_id || partner.id?.toString();
              const partnerName = getTranslated(partner.nom_partenaire, `Partner ${partnerId}`);
              const logoUrl = getImageUrl(partner.logo);

              return (
                <Link
                  key={`scroll-${partnerId}-${index}`}
                  to={`/partner/${partnerId}`}
                  className="flex-shrink-0"
                >
                  <div className="flex items-center justify-center w-40 h-24 border border-border/50 rounded-xl bg-card hover:border-primary/30 transition-all duration-300">
                    <img
                      src={logoUrl}
                      alt={partnerName}
                      className="w-32 h-16 object-contain opacity-70 hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.errorHandled) {
                          target.dataset.errorHandled = 'true';
                          target.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default Partnerships;
