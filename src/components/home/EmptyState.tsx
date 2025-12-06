/**
 * @file EmptyState.tsx
 * @description Professional empty state component for when database content is unavailable
 */

import { motion } from "framer-motion";
import { LucideIcon, Database, Clock } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  compact?: boolean;
}

const EmptyState = ({ icon: Icon = Database, title, description, compact = false }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center text-center ${compact ? 'py-12' : 'py-20'}`}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Icon className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <motion.div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>
      
      <div className="mt-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
        <span className="text-sm text-muted-foreground">Content coming soon</span>
      </div>
    </motion.div>
  );
};

export default EmptyState;
