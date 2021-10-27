import { Header, headerHeight } from 'components/Header/Header';
import { WorksListSketch } from 'components/Sketches/WorksListSketch';
import React from 'react';
import styled from 'styled-components';
import { WorksDetail } from './WorksDetail';
import { WorksListMenu } from './WorksListMenu';

export const TopPage: React.VFC = () => {
  const [hoverId, setHoverId] = React.useState<number>(0);
  return (
    <StyledRoot>
      <Header></Header>
      <StyledContentContainer>
        <StyledSketchContainer>
          <WorksListSketch width="100%" height="100%" bgcolor="#0e0e0e"></WorksListSketch>
        </StyledSketchContainer>
        <WorksListMenu hoverId={hoverId} setHoverId={setHoverId}></WorksListMenu>
        <WorksDetail hoverId={hoverId}></WorksDetail>
      </StyledContentContainer>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #111111;
  overflow-y: hidden;
`;

const StyledContentContainer = styled.div`
  width: 100%;
  flex: 1;
  height: calc(100vh - ${headerHeight}px);
  display: flex;
`;

const StyledSketchContainer = styled.div`
  flex: 1;
  min-width: 400px;
`;
