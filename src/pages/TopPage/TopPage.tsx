import { WorksListSketch } from 'components/Sketches/WorksListSketch';
import React from 'react';
import styled from 'styled-components';

export const TopPage: React.VFC = () => {
  return (
    <StyledContainer>
      <WorksListSketch width="100%" height="100%"></WorksListSketch>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
