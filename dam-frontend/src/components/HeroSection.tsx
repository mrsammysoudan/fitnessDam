// src/components/HeroSection.tsx

import React from "react";
import styled from "styled-components";
import { Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/fitness-bg.jpg"; // Ensure this path is correct

// Styled Components
const HeroContainer = styled(Box)<{ $bgImage: string }>`
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  height: 80vh;
  position: relative;
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundOverlay};
    z-index: 1;
  }
`;

const Content = styled(Box)`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;
`;

const StyledTypography = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.customBreakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.customBreakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.customBreakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.customBreakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
    transform: translateY(-3px);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.buttonHover};
    outline-offset: 2px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer $bgImage={heroImage}>
      <Content>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StyledTypography variant="h2" gutterBottom>
            Transform Your Fitness Journey
          </StyledTypography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <SubTitle variant="h6">
            Achieve your health and fitness goals with personalized plans and
            expert guidance.
          </SubTitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <StyledLink to="/register">
            <StyledButton variant="contained" disableElevation>
              Get Started
            </StyledButton>
          </StyledLink>
        </motion.div>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;
