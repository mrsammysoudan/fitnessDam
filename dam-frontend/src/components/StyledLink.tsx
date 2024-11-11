// src/components/StyledLink.tsx

import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

// Create a styled version of react-router-dom's Link
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

export default StyledLink;
