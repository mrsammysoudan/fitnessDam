// src/styles/theme.d.ts

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      backgroundOverlay: string;
      cardBackground: string;
      buttonHover: string;
      textLight: string;
      textDark: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    customBreakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      primary?: string;
      primaryDark?: string;
      secondary?: string;
      backgroundOverlay?: string;
      cardBackground?: string;
      buttonHover?: string;
      textLight?: string;
      textDark?: string;
    };
    fonts?: {
      primary?: string;
      secondary?: string;
    };
    customBreakpoints?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
    };
  }
}
