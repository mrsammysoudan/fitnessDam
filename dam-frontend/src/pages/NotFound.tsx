// src/pages/NotFound.tsx

import React from "react";
import { Typography, Container } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you're looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
