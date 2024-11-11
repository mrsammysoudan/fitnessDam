// src/styles/components/Button.ts

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  textTransform: "none",
  // Add more custom styles if needed
}));

export default CustomButton;
