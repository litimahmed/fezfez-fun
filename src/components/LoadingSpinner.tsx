import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const LoadingSpinner = ({ onComplete, minDuration = 2000 }: LoadingSpinnerProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center">
      {/* Logo with fade-in animation */}
      <div 
        className="mb-16 transition-all duration-1000"
        style={{ 
          opacity: progress > 10 ? 1 : 0,
          transform: `translateY(${progress > 10 ? 0 : 20}px)`
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-accent flex items-center justify-center rounded-lg">
            <span className="text-accent-foreground font-display text-3xl font-bold">A</span>
          </div>
          <span className="text-3xl font-display text-light tracking-[0.15em]">AVERIX</span>
        </div>
      </div>

      {/* Minimal Progress Bar Container */}
      <div className="w-48 md:w-64">
        {/* Progress track */}
        <div className="h-[2px] bg-light/10 rounded-full overflow-hidden">
          {/* Progress fill */}
          <div 
            className="h-full bg-accent transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage and loading text */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-light/40 text-[10px] tracking-[0.3em] uppercase font-display">
            Loading
          </span>
          <span className="text-accent text-sm font-display tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </div>
  );
};
