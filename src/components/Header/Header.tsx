import React from 'react';
import styled from 'styled-components';
import logo from 'assets/logo/logo.png';

export const headerHeight = 48;

export const Header: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledLink href="https://iiiexhibition.com/">
        <img src={logo} height={`${headerHeight - 18}px`} />
      </StyledLink>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: ${headerHeight}px;
  min-height: ${headerHeight}px;
  width: 100%;
  background-color: #000000;
  padding-left: 20px;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
`;
