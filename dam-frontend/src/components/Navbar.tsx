// src/components/Navbar.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Define the structure for navigation links
interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Generate Workout", path: "/generate-workout" },
  { name: "Progress", path: "/progress" },
  { name: "Settings", path: "/settings" },
];

// Styled Components

const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Logo = styled(Typography)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  cursor: pointer;
  flex-grow: 1;
`;

const NavButtons = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.customBreakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textLight};
  display: none;

  @media (max-width: ${({ theme }) => theme.customBreakpoints.tablet}) {
    display: block;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const DrawerList = styled(List)`
  width: 250px;
`;

const DrawerButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  text-transform: none;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textLight};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // Close the drawer after navigation
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          {/* Logo as a clickable Typography component */}
          <Logo
            variant="h6"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            Workout Planner
          </Logo>

          {/* Navigation Buttons for Desktop */}
          <NavButtons>
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant={currentPath === link.path ? "contained" : "text"}
                    sx={{
                      color: "#FFFFFF",
                      backgroundColor:
                        currentPath === link.path ? "#F05941" : "transparent",
                      "&:hover": {
                        backgroundColor:
                          currentPath === link.path ? "#d94836" : "#F05941",
                      },
                    }}
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.name}
                  </Button>
                ))}
                <Button
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor:
                      currentPath === "/logout" ? "#F05941" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        currentPath === "/logout" ? "#d94836" : "#F05941",
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor:
                      currentPath === "/login" ? "#F05941" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        currentPath === "/login" ? "#d94836" : "#F05941",
                    },
                  }}
                  onClick={() => handleNavigation("/login")}
                >
                  Login
                </Button>
                <Button
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor:
                      currentPath === "/register" ? "#F05941" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        currentPath === "/register" ? "#d94836" : "#F05941",
                    },
                  }}
                  onClick={() => handleNavigation("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </NavButtons>

          {/* Hamburger Menu for Mobile Devices */}
          {isAuthenticated && (
            <MobileMenuButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </MobileMenuButton>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerHeader>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerList>
          {isAuthenticated ? (
            <>
              {navLinks.map((link) => (
                <DrawerButton
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className={currentPath === link.path ? "active" : ""}
                >
                  {link.name}
                </DrawerButton>
              ))}
              <DrawerButton
                onClick={handleLogout}
                className={currentPath === "/logout" ? "active" : ""}
              >
                Logout
              </DrawerButton>
            </>
          ) : (
            <>
              <DrawerButton
                onClick={() => handleNavigation("/login")}
                className={currentPath === "/login" ? "active" : ""}
              >
                Login
              </DrawerButton>
              <DrawerButton
                onClick={() => handleNavigation("/register")}
                className={currentPath === "/register" ? "active" : ""}
              >
                Register
              </DrawerButton>
            </>
          )}
        </DrawerList>
      </Drawer>
    </>
  );
};

export default Navbar;
