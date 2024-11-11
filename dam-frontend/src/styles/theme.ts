import { createTheme, Shadows } from "@mui/material/styles";
import "styled-components";

// Extend MUI's Theme to include custom properties
declare module "@mui/material/styles" {
  interface Theme {
    shadows: Shadows; // Use MUI's Shadows type
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
    shadows?: Shadows; // Match the type of Shadows from MUI
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

// Create the MUI theme with custom properties
const theme = createTheme({
  palette: {
    primary: {
      main: "#BE3144",
    },
    secondary: {
      main: "#F05941",
    },
    background: {
      default: "#F5F7FA",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  },
  spacing: 8, // Ensures theme.spacing() is a function
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
    "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
    "0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)",
    "0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)",
    "0px 1px 1px rgba(0, 0, 0, 0.15)",
    "0px 2px 2px rgba(0, 0, 0, 0.15)",
    "0px 3px 3px rgba(0, 0, 0, 0.15)",
    "0px 4px 4px rgba(0, 0, 0, 0.15)",
    "0px 5px 5px rgba(0, 0, 0, 0.15)",
    "0px 6px 6px rgba(0, 0, 0, 0.15)",
    "0px 7px 7px rgba(0, 0, 0, 0.15)",
    "0px 8px 8px rgba(0, 0, 0, 0.15)",
    "0px 9px 9px rgba(0, 0, 0, 0.15)",
    "0px 10px 10px rgba(0, 0, 0, 0.15)",
    "0px 11px 11px rgba(0, 0, 0, 0.15)",
    "0px 12px 12px rgba(0, 0, 0, 0.15)",
    "0px 13px 13px rgba(0, 0, 0, 0.15)",
    "0px 14px 14px rgba(0, 0, 0, 0.15)",
    "0px 15px 15px rgba(0, 0, 0, 0.15)",
    "0px 16px 16px rgba(0, 0, 0, 0.15)",
    "0px 17px 17px rgba(0, 0, 0, 0.15)",
    "0px 18px 18px rgba(0, 0, 0, 0.15)",
    "0px 19px 19px rgba(0, 0, 0, 0.15)",
  ] as Shadows, // Cast explicitly to Shadows type
  colors: {
    primary: "#BE3144",
    primaryDark: "#BF2030",
    secondary: "#F05941",
    backgroundOverlay: "rgba(0, 0, 0, 0.5)",
    cardBackground: "rgba(135, 35, 65, 0.6)",
    buttonHover: "#F05941",
    textLight: "#FFFFFF",
    textDark: "#000000",
  },
  fonts: {
    primary: "'Montserrat', sans-serif",
    secondary: "'Roboto', sans-serif",
  },
  customBreakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
});

export default theme;
