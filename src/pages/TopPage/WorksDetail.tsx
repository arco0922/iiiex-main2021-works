import React from 'react';
import styled from 'styled-components';

export const WorksDetail: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledTitle>INFO</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 250px;
  height: 100%;
  padding: 5px;
  background-color: #141414;
  color: white;
`;

const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
`;
