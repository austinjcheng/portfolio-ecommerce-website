import styled from "styled-components";
import React from 'react';

const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const UnstyledLink = styled(Link)`
  suppressHydrationWarning: true;
  text-decoration: none;
  color: inherit;

  &:hover {
  cursor: pointer;
`;
/*const UnstyledLink = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;*/

export default UnstyledLink;
