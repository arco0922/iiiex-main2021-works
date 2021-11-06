import { Visited } from 'AppRoot';
import { Header, headerHeight } from 'components/Header/Header';
import { WorksListSketch } from 'components/Sketches/WorksListSketch';
import { LayoutType } from 'constants/Layout';
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
  layout: LayoutType;
  setIsHamburgerShow: (isHamburgerShow: boolean) => void;
}

export const TopPage: React.VFC<Props> = ({
  selectId,
  setSelectId,
  setMapModeId,
  visited,
  layout,
  setIsHamburgerShow,
}) => {
  const selectIdRef = React.useRef<number>(0);
  const [isShowDetail, setIsShowDetail] = React.useState<boolean>(true);
  const isShowDetailRef = React.useRef<boolean>(true);
  const layoutRef = React.useRef<LayoutType>('WIDE');

  React.useEffect(() => {
    selectIdRef.current = selectId;
  }, [selectId]);
  React.useEffect(() => {
    isShowDetailRef.current = isShowDetail;
  }, [isShowDetail]);
  React.useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  return (
    <StyledRoot>
      <Header layout={layout} setIsHamburgerShow={setIsHamburgerShow}></Header>
      <StyledContentContainer>
        <StyledSketchContainer>
          <WorksListSketch
            width="100%"
            height="100%"
            selectIdRef={selectIdRef}
            setSelectId={setSelectId}
            isShowDetailRef={isShowDetailRef}
            setIsShowDetail={setIsShowDetail}
            layoutRef={layoutRef}
            setMapModeId={setMapModeId}
            bgcolor="#0e0e0e"
          ></WorksListSketch>
          <StyledLoading id="p5_loading">
            <p>Loading...</p>
          </StyledLoading>
          {layout !== 'NARROW' ? (
            <WorksDetail
              visited={visited}
              selectId={selectId}
              isShowDetail={isShowDetail}
              setIsShowDetail={setIsShowDetail}
            ></WorksDetail>
          ) : (
            <></>
          )}
        </StyledSketchContainer>
        {layout === 'WIDE' && (
          <WorksListMenu
            visited={visited}
            selectId={selectId}
            setSelectId={setSelectId}
            setIsShowDetail={setIsShowDetail}
          ></WorksListMenu>
        )}
      </StyledContentContainer>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  background-color: #111111;
  overflow-y: hidden;
`;

const StyledContentContainer = styled.div`
  width: 100%;
  height: calc(100% - ${headerHeight}px);
  display: flex;
`;

const StyledSketchContainer = styled.div`
  flex: 1;
  min-width: 300px;
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
