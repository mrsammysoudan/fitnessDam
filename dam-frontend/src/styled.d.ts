// src/styled.d.ts

import "styled-components";
import { Theme as MUITheme } from "@mui/material/styles";

// Extend styled-components' DefaultTheme to include MUI's Theme
declare module "styled-components" {
  export interface DefaultTheme extends MUITheme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      backgroundOverlay: string;
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
}
