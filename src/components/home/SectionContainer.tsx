/**
 * @file SectionContainer.tsx
 * @description Reusable section container with consistent spacing and styling
 */

import { ReactNode } from "react";

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  variant?: 'default' | 'muted' | 'gradient';
  className?: string;
}

const SectionContainer = ({ id, children, variant = 'default', className = '' }: SectionContainerProps) => {
  const variantStyles = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    gradient: 'bg-gradient-to-b from-background via-muted/20 to-background',
  };

  return (
    <section 
      id={id} 
      className={`py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
