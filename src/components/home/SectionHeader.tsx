/**
 * @file SectionHeader.tsx
 * @description Reusable section header component for consistent corporate styling across homepage sections
 */

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = ({ icon: Icon, badge, title, subtitle, centered = true }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {(Icon || badge) && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`inline-flex items-center gap-3 mb-6 ${centered ? 'justify-center' : ''}`}
        >
          {Icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
          {badge && (
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {badge}
            </span>
          )}
        </motion.div>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
