/**
 * @file ContactSection.tsx
 * @description Enterprise-level Contact section with professional design and proper empty states
 */

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";
import { useContactInfo } from "@/hooks/useContactInfo";
import { Button } from "@/components/ui/button";
import { TbBrandTiktok } from "react-icons/tb";
import SectionContainer from "@/components/home/SectionContainer";
import SectionHeader from "@/components/home/SectionHeader";
import EmptyState from "@/components/home/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

const ContactSection = () => {
  const { t, language } = useTranslation();
  const { data: contactData, isLoading } = useContactInfo();

  type TranslatableField = { fr: string; ar: string; en: string } | undefined;
  type Language = "en" | "fr" | "ar";

  const getTranslated = (field: TranslatableField) => {
    if (!field) return "";
    return field[language as Language] || field["en"] || "";
  };

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: "Contact Us",
        fr: "Contactez-Nous",
        ar: "اتصل بنا",
      },
      subtitle: {
        en: "Get in touch with our team for any inquiries",
        fr: "Contactez notre équipe pour toute demande",
        ar: "تواصل مع فريقنا لأي استفسار",
      },
      cta: {
        en: "Send us a message",
        fr: "Envoyez-nous un message",
        ar: "أرسل لنا رسالة",
      },
      emptyTitle: {
        en: "Contact Information",
        fr: "Informations de contact",
        ar: "معلومات الاتصال",
      },
      emptyDescription: {
        en: "Our contact details will be available soon. In the meantime, feel free to reach out through our contact form.",
        fr: "Nos coordonnées seront bientôt disponibles. En attendant, n'hésitez pas à nous contacter via notre formulaire.",
        ar: "ستتوفر تفاصيل الاتصال قريباً. في غضون ذلك، لا تتردد في التواصل معنا عبر نموذج الاتصال."
      },
      followUs: {
        en: "Follow Us",
        fr: "Suivez-nous",
        ar: "تابعنا"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || "";
  };

  const contactItems = [
    contactData?.email && {
      icon: Mail,
      label: language === "fr" ? "Email" : language === "ar" ? "البريد الإلكتروني" : "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    contactData?.telephone_1 && {
      icon: Phone,
      label: language === "fr" ? "Téléphone" : language === "ar" ? "هاتف" : "Phone",
      value: contactData.telephone_1,
      href: `tel:${contactData.telephone_1}`,
    },
    contactData?.adresse && {
      icon: MapPin,
      label: language === "fr" ? "Adresse" : language === "ar" ? "عنوان" : "Address",
      value: `${getTranslated(contactData.adresse)}${contactData.ville ? `, ${getTranslated(contactData.ville)}` : ""}`,
      href: "#",
    },
    contactData?.horaires && {
      icon: Clock,
      label: language === "fr" ? "Horaires" : language === "ar" ? "ساعات العمل" : "Hours",
      value: contactData.horaires,
      href: "#",
    },
  ].filter(Boolean);

  const socialLinks = [
    contactData?.facebook && { icon: Facebook, href: contactData.facebook, label: "Facebook" },
    contactData?.instagram && { icon: Instagram, href: contactData.instagram, label: "Instagram" },
    contactData?.linkedin && { icon: Linkedin, href: contactData.linkedin, label: "LinkedIn" },
    contactData?.x && { icon: Twitter, href: contactData.x, label: "X" },
    contactData?.tiktok && { icon: TbBrandTiktok, href: contactData.tiktok, label: "TikTok" },
  ].filter(Boolean);

  const hasContactInfo = contactItems.length > 0;

  // Loading State
  if (isLoading) {
    return (
      <SectionContainer id="contact" variant="muted">
        <SectionHeader
          icon={MessageCircle}
          title={getText("title")}
          subtitle={getText("subtitle")}
        />
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="contact" variant="muted">
      <SectionHeader
        icon={MessageCircle}
        title={getText("title")}
        subtitle={getText("subtitle")}
      />

      <div className="max-w-4xl mx-auto">
        {hasContactInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            {/* Contact Items */}
            <div className="grid sm:grid-cols-2 gap-0">
              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-start gap-4 p-6 hover:bg-muted/50 transition-colors group border-b border-border sm:border-b-0 ${
                    index % 2 === 0 ? 'sm:border-r' : ''
                  } ${index >= 2 ? 'sm:border-t' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">{item.label}</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="border-t border-border p-6">
                <p className="text-sm text-muted-foreground text-center mb-4">{getText("followUs")}</p>
                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="border-t border-border p-6 bg-muted/30">
              <div className="flex justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/contact">
                    {getText("cta")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-card border border-border rounded-2xl">
            <EmptyState
              icon={MessageCircle}
              title={getText("emptyTitle")}
              description={getText("emptyDescription")}
            />
            <div className="border-t border-border p-6">
              <div className="flex justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/contact">
                    {getText("cta")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
