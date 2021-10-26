import React from 'react';
import styled from 'styled-components';

export const WorksListMenu: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledTitle>WORKS</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 250px;
  height: 100%;
  padding: 4px;
  background-color: #141414;
  color: white;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;
