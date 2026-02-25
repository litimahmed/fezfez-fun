import { ArrowRight, ArrowUp, Linkedin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: t("footer.contactUs"), href: "#contact" },
    { name: t("footer.privacyPolicy"), href: "#" },
    { name: t("footer.terms"), href: "#" },
  ];

  return (
    <footer className="bg-dark text-light pt-20 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-16 pb-16 border-b border-light/10">
          {/* Brand Column */}
          <div>
            <a href="#" className="inline-block -mb-4 -ml-7">
              <img 
                src="/averix_logo.png" 
                alt="Averix Logo" 
                className="h-32 w-auto object-contain -ml-4 object-left"
              />
            </a>
            <p className="text-light/50 text-sm leading-relaxed mb-8 max-w-xs -mt-2">
              {t("footer.description")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/213781913776"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:text-accent-foreground" />
              </a>
              <a
                href="https://x.com/ahmedlitim07"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <span className="text-lg font-bold group-hover:text-accent-foreground">𝕏</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-litim-278781370?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Linkedin className="w-4 h-4 group-hover:text-accent-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm mb-8 tracking-[0.2em] uppercase">{t("footer.quickLinks")}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light/50 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm mb-8 tracking-[0.2em] uppercase">{t("footer.subscribe")}</h4>
            <p className="text-light/50 text-sm mb-6 leading-relaxed">
              {t("footer.subscribeText")}
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="bg-transparent border-light/20 text-light placeholder:text-light/40 text-sm rounded-l-full rounded-r-none focus:border-accent h-12 px-6"
              />
              <button className="w-12 h-12 bg-accent rounded-r-full flex items-center justify-center hover:bg-accent/90 transition-colors">
                <ArrowRight className="w-4 h-4 text-accent-foreground -rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex items-center justify-between">
          <p className="text-light/40 text-xs">
            {t("footer.copyright")}
          </p>
          
          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-accent transition-colors group"
          >
            <ArrowUp className="w-4 h-4 text-accent group-hover:text-accent-foreground transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
};