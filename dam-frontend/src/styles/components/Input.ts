// src/styles/components/Input.ts

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomInput = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
  // Add more custom styles if needed
}));

export default CustomInput;
