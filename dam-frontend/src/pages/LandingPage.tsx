// src/pages/LandingPage.tsx

import React from "react";
import styled from "styled-components";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import feature1 from "../assets/feature1.svg"; // Replace with your own icons
import feature2 from "../assets/feature2.svg";
import feature3 from "../assets/feature3.svg";
import testimonial1 from "../assets/testimonial1.jpg"; // Replace with user images
import testimonial2 from "../assets/testimonial2.jpg";

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const FeatureBox = styled(Box)`
  text-align: center;
  padding: 2rem;
`;

const FeatureIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.textDark};
`;

const TestimonialsSection = styled.section`
  padding: 4rem 0;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const TestimonialBox = styled(Box)`
  text-align: center;
  padding: 2rem;
`;

const TestimonialImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const TestimonialText = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-style: italic;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 1rem;
`;

const TestimonialName = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
`;

const CallToActionSection = styled.section`
  padding: 4rem 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  text-align: center;
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

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection />

      <FeaturesSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}
            >
              Our Features
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ marginTop: "2rem" }}
          >
            {/* Feature 1 */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureBox>
                  <FeatureIcon src={feature1} alt="Personalized Plans" />
                  <FeatureTitle variant="h6">Personalized Plans</FeatureTitle>
                  <FeatureDescription variant="body1">
                    Tailored workout and nutrition plans to meet your individual
                    goals.
                  </FeatureDescription>
                </FeatureBox>
              </motion.div>
            </Grid>

            {/* Feature 2 */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FeatureBox>
                  <FeatureIcon src={feature2} alt="Track Progress" />
                  <FeatureTitle variant="h6">Track Progress</FeatureTitle>
                  <FeatureDescription variant="body1">
                    Monitor your improvements with detailed analytics and
                    progress charts.
                  </FeatureDescription>
                </FeatureBox>
              </motion.div>
            </Grid>

            {/* Feature 3 */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <FeatureBox>
                  <FeatureIcon src={feature3} alt="Expert Guidance" />
                  <FeatureTitle variant="h6">Expert Guidance</FeatureTitle>
                  <FeatureDescription variant="body1">
                    Access to certified trainers and nutritionists for
                    personalized advice.
                  </FeatureDescription>
                </FeatureBox>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </FeaturesSection>

      <TestimonialsSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}
            >
              What Our Users Say
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ marginTop: "2rem" }}
          >
            {/* Testimonial 1 */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialBox>
                  <TestimonialImage
                    src={testimonial1}
                    alt="User Testimonial 1"
                  />
                  <TestimonialText variant="body1">
                    "This app completely transformed my fitness routine. The
                    personalized plans are spot on!"
                  </TestimonialText>
                  <TestimonialName variant="subtitle1">
                    - Jane Doe
                  </TestimonialName>
                </TestimonialBox>
              </motion.div>
            </Grid>

            {/* Testimonial 2 */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <TestimonialBox>
                  <TestimonialImage
                    src={testimonial2}
                    alt="User Testimonial 2"
                  />
                  <TestimonialText variant="body1">
                    "The progress tracking features kept me motivated and
                    accountable. Highly recommend!"
                  </TestimonialText>
                  <TestimonialName variant="subtitle1">
                    - John Smith
                  </TestimonialName>
                </TestimonialBox>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </TestimonialsSection>

      <CallToActionSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontFamily: "Roboto, sans-serif", color: "textDark" }}
            >
              Join thousands of users who have transformed their lives with our
              app.
            </Typography>
            <StyledButton variant="contained" disableElevation>
              Sign Up Now
            </StyledButton>
          </motion.div>
        </Container>
      </CallToActionSection>
    </Box>
  );
};

export default LandingPage;
