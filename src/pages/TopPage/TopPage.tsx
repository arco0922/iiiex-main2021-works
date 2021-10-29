import { Header, headerHeight } from 'components/Header/Header';
import { WorksListSketch } from 'components/Sketches/WorksListSketch';
import React from 'react';
import styled from 'styled-components';
import { WorksDetail } from './WorksDetail';
import { WorksListMenu } from './WorksListMenu';

export const TopPage: React.VFC = () => {
  const [selectId, setSelectId] = React.useState<number>(0);
  const selectIdRef = React.useRef<number>(0);
  React.useEffect(() => {
    selectIdRef.current = selectId;
  }, [selectId]);
  return (
    <StyledRoot>
      <Header></Header>
      <StyledContentContainer>
        <StyledSketchContainer>
          <WorksListSketch
            width="100%"
            height="100%"
            selectIdRef={selectIdRef}
            setSelectId={setSelectId}
            bgcolor="#0e0e0e"
          ></WorksListSketch>
          <StyledLoading id="p5_loading">
            <p>Loading...</p>
          </StyledLoading>
        </StyledSketchContainer>
        <WorksListMenu selectId={selectId} setSelectId={setSelectId}></WorksListMenu>
        <WorksDetail selectId={selectId}></WorksDetail>
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
  position: relative;
`;

const StyledLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    color: white;
    font-size: 15px;
  }
`;
