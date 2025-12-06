/**
 * @file ContentCard.tsx
 * @description Reusable content card with consistent corporate styling
 */

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ContentCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: ReactNode;
  index?: number;
  href?: string;
  onClick?: () => void;
}

const ContentCard = ({ icon: Icon, title, description, children, index = 0, href, onClick }: ContentCardProps) => {
  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <CardWrapper
        {...wrapperProps}
        onClick={onClick}
        className={`relative flex flex-col h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card ${href || onClick ? 'cursor-pointer' : ''}`}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col h-full">
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
          
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">
              {description}
            </p>
          )}
          
          {children}
        </div>
      </CardWrapper>
    </motion.div>
  );
};

export default ContentCard;
