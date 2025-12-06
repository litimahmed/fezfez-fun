/**
 * @file Footer.tsx
 * @description Enterprise-level footer with professional corporate design
 */

import { motion } from "framer-motion";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "react-router-dom";
import ToorriiLogo from "@/assets/toorrii-logo.png";

const Footer = () => {
  const { t, language } = useTranslation();

  const currentYear = new Date().getFullYear();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      rights: {
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        ar: "جميع الحقوق محفوظة."
      },
      madeWith: {
        en: "Made with excellence in Algeria",
        fr: "Créé avec excellence en Algérie",
        ar: "صنع بتميز في الجزائر"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || "";
  };

  const footerLinks = [
    { label: t("footer.privacyPolicy"), href: "/privacy-policy" },
    { label: t("footer.termsOfService"), href: "/terms-of-service" },
    { label: t("nav.contact") || "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Logo & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/" className="h-10 flex-shrink-0">
                <img 
                  src={ToorriiLogo} 
                  alt="Toorrii Logo" 
                  className="h-full w-auto object-contain"
                />
              </Link>
              <div className="h-px w-8 bg-border hidden sm:block" />
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  © {currentYear} Toorrii. {getText("rights")}
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <nav className="flex items-center gap-6">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-border/50">
          <div className="flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xs text-muted-foreground/70 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {getText("madeWith")}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
