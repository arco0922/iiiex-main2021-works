import { Visited } from 'AppRoot';
import { Header, headerHeight } from 'components/Header/Header';
import { WorksListSketch } from 'components/Sketches/WorksListSketch';
import { MapModeId } from 'constants/MapCoords';
import React from 'react';
import styled from 'styled-components';
import { WorksDetail } from './WorksDetail';
import { WorksListMenu } from './WorksListMenu';

interface Props {
  selectId: number;
  setSelectId: (selectId: number) => void;
  setMapModeId: (mapModeId: MapModeId) => void;
  visited: Visited;
}

export const TopPage: React.VFC<Props> = ({ selectId, setSelectId, setMapModeId, visited }) => {
  const selectIdRef = React.useRef<number>(0);
  React.useEffect(() => {
    selectIdRef.current = selectId;
  }, [selectId]);
  const [isShowDetail, setIsShowDetail] = React.useState<boolean>(false);
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
            setMapModeId={setMapModeId}
            bgcolor="#0e0e0e"
          ></WorksListSketch>
          <StyledLoading id="p5_loading">
            <p>Loading...</p>
          </StyledLoading>
        </StyledSketchContainer>
        <WorksListMenu visited={visited} selectId={selectId} setSelectId={setSelectId}></WorksListMenu>
        <WorksDetail visited={visited} selectId={selectId}></WorksDetail>
      </StyledContentContainer>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #111111;
  overflow-y: hidden;
`;

const StyledContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  display: flex;
`;

const StyledSketchContainer = styled.div`
  flex: 1;
  min-width: 400px;
  height: 100%;
  overflow: hidden;
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
