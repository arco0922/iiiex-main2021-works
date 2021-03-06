import { Visited } from 'AppRoot';
import { Header, headerHeight } from 'components/Header/Header';
import { LoadingSpinner } from 'components/Loading/LoadingSpinner';
import { WorksListSketch } from 'components/Sketches/WorksListSketch';
import { LayoutType } from 'constants/Layout';
import { Coord, MapModeId } from 'constants/MapCoords';
import React from 'react';
import styled from 'styled-components';
import { Carousel } from './Carousel';
import { WorksDetail } from './WorksDetail';
import { bottomDetailHeight, WorksDetailBottom } from './WorksDetailBottom';
import { WorksListMenu } from './WorksListMenu';

interface Props {
  selectId: number;
  setSelectId: (selectId: number) => void;
  mapModeId: MapModeId;
  setMapModeId: (mapModeId: MapModeId) => void;
  mapModeIdRef: React.MutableRefObject<MapModeId>;
  visited: Visited;
  layout: LayoutType;
  isShowHamburgerRef: React.MutableRefObject<boolean>;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
  setCoords: (coords: Coord[]) => void;
  visitedRef: React.MutableRefObject<Visited>;
  setWorksHistory: (worksHistory: number[]) => void;
  setWorksHistoryIndex: (id: number | null) => void;
}

export type InitialAnimationStatus = 'BEFORE' | 'ANIMATING' | 'END';

export const TopPage: React.VFC<Props> = ({
  selectId,
  setSelectId,
  mapModeId,
  setMapModeId,
  mapModeIdRef,
  visited,
  layout,
  isShowHamburgerRef,
  setIsShowHamburger,
  setCoords,
  visitedRef,
  setWorksHistory,
  setWorksHistoryIndex,
}) => {
  const selectIdRef = React.useRef<number>(0);
  const [isShowDetail, setIsShowDetail] = React.useState<boolean>(false);
  const isShowDetailRef = React.useRef<boolean>(false);
  const [initialAnimationStatus, setInitialAnimationStatus] = React.useState<InitialAnimationStatus>('BEFORE');
  const initialAnimationStatusRef = React.useRef<InitialAnimationStatus>('BEFORE');
  const layoutRef = React.useRef<LayoutType>('WIDE');
  const isCursorOnCarouselRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    selectIdRef.current = selectId;
  }, [selectId]);
  React.useEffect(() => {
    isShowDetailRef.current = isShowDetail;
  }, [isShowDetail]);
  React.useEffect(() => {
    initialAnimationStatusRef.current = initialAnimationStatus;
  }, [initialAnimationStatus]);
  React.useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);
  React.useEffect(() => {
    setWorksHistory([]);
    setWorksHistoryIndex(null);
  }, [setWorksHistory, setWorksHistoryIndex]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsShowDetail(true);
      setInitialAnimationStatus('ANIMATING');
    }, 300);
  }, []);

  React.useEffect(() => {
    setTimeout(() => setInitialAnimationStatus('END'), 650);
  }, []);

  return (
    <StyledRoot>
      <Header layout={layout} setIsShowHamburger={setIsShowHamburger}></Header>
      <StyledContentContainer>
        <StyledSketchContainer>
          <Carousel
            mapModeId={mapModeId}
            setMapModeId={setMapModeId}
            layout={layout}
            isCursorOnCarouselRef={isCursorOnCarouselRef}
          />
          <WorksListSketch
            width="100%"
            height="100%"
            selectIdRef={selectIdRef}
            setSelectId={setSelectId}
            initialAnimationStatusRef={initialAnimationStatusRef}
            setIsShowDetail={setIsShowDetail}
            isShowDetailRef={isShowDetailRef}
            isShowHamburgerRef={isShowHamburgerRef}
            layoutRef={layoutRef}
            setMapModeId={setMapModeId}
            mapModeIdRef={mapModeIdRef}
            setCoords={setCoords}
            visitedRef={visitedRef}
            isCursorOnCarouselRef={isCursorOnCarouselRef}
            bgcolor="#0e0e0e"
          ></WorksListSketch>
          <StyledLoading isNarrowLayout={layout === 'NARROW'} id="p5_loading">
            <LoadingSpinner />
          </StyledLoading>
          {layout === 'NARROW' ? (
            <WorksDetailBottom
              selectId={selectId}
              visited={visited}
              isShowDetail={isShowDetail}
              setIsShowDetail={setIsShowDetail}
            ></WorksDetailBottom>
          ) : (
            <></>
          )}
        </StyledSketchContainer>
        {layout !== 'NARROW' ? (
          <WorksDetail
            visited={visited}
            selectId={selectId}
            isShowDetail={isShowDetail}
            setIsShowDetail={setIsShowDetail}
            layout={layout}
          ></WorksDetail>
        ) : (
          <></>
        )}
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
  overflow: hidden;
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

interface StyledLoadingProps {
  isNarrowLayout: boolean;
}

const StyledLoading = styled.div<StyledLoadingProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ isNarrowLayout }) => (isNarrowLayout ? `calc(100% - ${bottomDetailHeight}px)` : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
`;
