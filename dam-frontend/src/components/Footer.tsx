// src/components/Footer.tsx

import React from "react";
import styled from "styled-components";
import { Box, Typography, IconButton, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StyledLink from "./StyledLink"; // Ensure this path is correct

// Styled Components

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 3rem 1rem;
  margin-top: 4rem;
`;

const FooterGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SocialIcons = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterGrid container spacing={4}>
        {/* About Section */}
        <Grid item xs={12} md={4}>
          <FooterSection>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "Roboto, sans-serif" }}
            >
              Workout Planner is dedicated to helping you achieve your fitness
              goals with personalized plans and expert guidance.
            </Typography>
          </FooterSection>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} md={4}>
          <FooterSection>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}
            >
              Quick Links
            </Typography>
            <StyledLink to="/">
              <Typography
                variant="body2"
                sx={{ fontFamily: "Roboto, sans-serif", cursor: "pointer" }}
              >
                Home
              </Typography>
            </StyledLink>
            <StyledLink to="/features">
              <Typography
                variant="body2"
                sx={{ fontFamily: "Roboto, sans-serif", cursor: "pointer" }}
              >
                Features
              </Typography>
            </StyledLink>
            <StyledLink to="/pricing">
              <Typography
                variant="body2"
                sx={{ fontFamily: "Roboto, sans-serif", cursor: "pointer" }}
              >
                Pricing
              </Typography>
            </StyledLink>
            <StyledLink to="/contact">
              <Typography
                variant="body2"
                sx={{ fontFamily: "Roboto, sans-serif", cursor: "pointer" }}
              >
                Contact Us
              </Typography>
            </StyledLink>
          </FooterSection>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={4}>
          <FooterSection>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "Roboto, sans-serif" }}
            >
              123 Fitness Street,
              <br />
              Healthy City, FitState 12345
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "Roboto, sans-serif", mt: 1 }}
            >
              Email: support@workoutplanner.com
              <br />
              Phone: (123) 456-7890
            </Typography>
            <SocialIcons sx={{ mt: 2 }}>
              <IconButton
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                sx={{ color: "inherit" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                sx={{ color: "inherit" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                sx={{ color: "inherit" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: "inherit" }}
              >
                <LinkedInIcon />
              </IconButton>
            </SocialIcons>
          </FooterSection>
        </Grid>
      </FooterGrid>

      {/* Bottom Footer */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2" sx={{ fontFamily: "Roboto, sans-serif" }}>
          © {new Date().getFullYear()} Workout Planner. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
