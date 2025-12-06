import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AccentColor = "teal" | "blue" | "green" | "purple" | "orange";

interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  success: string;
  ring: string;
  foreground: string;
  cardForeground: string;
  popoverForeground: string;
  mutedForeground: string;
  accentForeground: string;
  border: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  headerBorder: string;
}

const colorThemes: Record<AccentColor, ThemeColors> = {
  teal: {
    primary: "182 86% 14%",
    primaryLight: "176 28% 35%",
    primaryDark: "182 90% 10%",
    secondary: "176 28% 35%",
    accent: "174 19% 57%",
    success: "174 19% 57%",
    ring: "182 86% 14%",
    foreground: "182 86% 14%",
    cardForeground: "182 86% 14%",
    popoverForeground: "182 86% 14%",
    mutedForeground: "182 40% 30%",
    accentForeground: "182 86% 14%",
    border: "155 27% 85%",
    sidebarForeground: "182 86% 14%",
    sidebarPrimary: "182 86% 14%",
    sidebarAccent: "182 60% 96%",
    sidebarAccentForeground: "182 86% 14%",
    sidebarBorder: "182 20% 92%",
    sidebarRing: "182 86% 14%",
    headerBorder: "182 20% 92%",
  },
  blue: {
    primary: "217 91% 50%",
    primaryLight: "217 80% 60%",
    primaryDark: "217 91% 40%",
    secondary: "217 70% 55%",
    accent: "217 60% 65%",
    success: "217 60% 65%",
    ring: "217 91% 50%",
    foreground: "217 91% 20%",
    cardForeground: "217 91% 20%",
    popoverForeground: "217 91% 20%",
    mutedForeground: "217 40% 40%",
    accentForeground: "217 91% 20%",
    border: "217 27% 88%",
    sidebarForeground: "217 91% 20%",
    sidebarPrimary: "217 91% 50%",
    sidebarAccent: "217 80% 96%",
    sidebarAccentForeground: "217 91% 20%",
    sidebarBorder: "217 20% 92%",
    sidebarRing: "217 91% 50%",
    headerBorder: "217 20% 92%",
  },
  green: {
    primary: "142 71% 35%",
    primaryLight: "142 60% 45%",
    primaryDark: "142 71% 25%",
    secondary: "142 55% 45%",
    accent: "142 45% 55%",
    success: "142 45% 55%",
    ring: "142 71% 35%",
    foreground: "142 71% 15%",
    cardForeground: "142 71% 15%",
    popoverForeground: "142 71% 15%",
    mutedForeground: "142 40% 35%",
    accentForeground: "142 71% 15%",
    border: "142 27% 88%",
    sidebarForeground: "142 71% 15%",
    sidebarPrimary: "142 71% 35%",
    sidebarAccent: "142 60% 96%",
    sidebarAccentForeground: "142 71% 15%",
    sidebarBorder: "142 20% 92%",
    sidebarRing: "142 71% 35%",
    headerBorder: "142 20% 92%",
  },
  purple: {
    primary: "271 81% 50%",
    primaryLight: "271 70% 60%",
    primaryDark: "271 81% 40%",
    secondary: "271 65% 55%",
    accent: "271 55% 65%",
    success: "271 55% 65%",
    ring: "271 81% 50%",
    foreground: "271 81% 20%",
    cardForeground: "271 81% 20%",
    popoverForeground: "271 81% 20%",
    mutedForeground: "271 40% 40%",
    accentForeground: "271 81% 20%",
    border: "271 27% 88%",
    sidebarForeground: "271 81% 20%",
    sidebarPrimary: "271 81% 50%",
    sidebarAccent: "271 70% 96%",
    sidebarAccentForeground: "271 81% 20%",
    sidebarBorder: "271 20% 92%",
    sidebarRing: "271 81% 50%",
    headerBorder: "271 20% 92%",
  },
  orange: {
    primary: "25 95% 53%",
    primaryLight: "25 85% 60%",
    primaryDark: "25 95% 43%",
    secondary: "25 80% 55%",
    accent: "25 70% 60%",
    success: "25 70% 60%",
    ring: "25 95% 53%",
    foreground: "25 95% 20%",
    cardForeground: "25 95% 20%",
    popoverForeground: "25 95% 20%",
    mutedForeground: "25 50% 40%",
    accentForeground: "25 95% 20%",
    border: "25 30% 88%",
    sidebarForeground: "25 95% 20%",
    sidebarPrimary: "25 95% 53%",
    sidebarAccent: "25 80% 96%",
    sidebarAccentForeground: "25 95% 20%",
    sidebarBorder: "25 20% 92%",
    sidebarRing: "25 95% 53%",
    headerBorder: "25 20% 92%",
  },
};

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const saved = sessionStorage.getItem("accent-color");
    return (saved as AccentColor) || "teal";
  });

  const applyTheme = (color: AccentColor) => {
    const theme = colorThemes[color];
    const root = document.documentElement;

    // Apply all color variables
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-light", theme.primaryLight);
    root.style.setProperty("--primary-dark", theme.primaryDark);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--success", theme.success);
    root.style.setProperty("--ring", theme.ring);
    
    // Apply foreground colors
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--card-foreground", theme.cardForeground);
    root.style.setProperty("--popover-foreground", theme.popoverForeground);
    root.style.setProperty("--muted-foreground", theme.mutedForeground);
    root.style.setProperty("--accent-foreground", theme.accentForeground);
    root.style.setProperty("--border", theme.border);
    
    // Apply sidebar colors
    root.style.setProperty("--sidebar-foreground", theme.sidebarForeground);
    root.style.setProperty("--sidebar-primary", theme.sidebarPrimary);
    root.style.setProperty("--sidebar-accent", theme.sidebarAccent);
    root.style.setProperty("--sidebar-accent-foreground", theme.sidebarAccentForeground);
    root.style.setProperty("--sidebar-border", theme.sidebarBorder);
    root.style.setProperty("--sidebar-ring", theme.sidebarRing);
    root.style.setProperty("--header-border", theme.headerBorder);

    // Update gradients
    root.style.setProperty(
      "--gradient-primary",
      `linear-gradient(135deg, hsl(${theme.primary}), hsl(${theme.primaryDark}))`
    );
    root.style.setProperty(
      "--gradient-hero",
      `linear-gradient(135deg, hsl(${theme.primaryLight}) 0%, hsl(${theme.primary}) 100%)`
    );

    // Update shadows
    root.style.setProperty(
      "--shadow-elegant",
      `0 10px 40px -10px hsl(${theme.primary} / 0.20)`
    );
    root.style.setProperty(
      "--shadow-glow",
      `0 0 60px hsl(${theme.accent} / 0.20)`
    );
    root.style.setProperty(
      "--shadow-card",
      `0 4px 20px hsl(${theme.primary} / 0.10)`
    );
    root.style.setProperty(
      "--shadow-header",
      `0 4px 30px -4px hsl(${theme.primary} / 0.12), 0 0 0 1px hsl(${theme.primary} / 0.05)`
    );
    root.style.setProperty(
      "--shadow-sidebar",
      `4px 0 30px -4px hsl(${theme.primary} / 0.10), 0 0 0 1px hsl(${theme.primary} / 0.05)`
    );
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    sessionStorage.setItem("accent-color", color);
    applyTheme(color);
  };

  // Apply theme on mount and when accent color changes
  useEffect(() => {
    applyTheme(accentColor);
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
