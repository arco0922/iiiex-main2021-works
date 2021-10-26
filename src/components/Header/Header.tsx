import React from 'react';
import styled from 'styled-components';

export const Header: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledTitle>東京大学制作展2021</StyledTitle>
    </StyledContainer>
  );
};

export const headerHeight = 40;

const StyledContainer = styled.div`
  height: ${headerHeight}px;
  min-height: ${headerHeight}px;
  width: 100%;
  background-color: #000000;
  padding-left: 20px;
`;

const StyledTitle = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 700;
  line-height: ${headerHeight}px;
`;
