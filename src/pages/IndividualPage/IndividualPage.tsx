import { Header, headerHeight } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import styled from 'styled-components';
import { IndividualWorksDetail } from './IndividualWorksDetail';
import { IndividualWorksWindow } from './IndividualWorksWindow';
import { OwnQuestionnaire } from './OwnQuestionnaire';
import { ReactionForm } from './ReactionForm';
import { isMobile, isTablet } from 'react-device-detect';
import { Visited } from 'AppRoot';
import { LayoutType } from 'constants/Layout';
import { Coord, MapModeId } from 'constants/MapCoords';
import { sortWorksByDistance } from 'utils/sortWorks';
import { NavigationArea } from './NavigationArea';
import { TopNavigationArea } from './TopNavigationArea';
import { calcNextRotationOrderWorksId, calcRotatedOrderWorksFromSpecificId } from 'utils/calcRotationUtils';
import { isSmoothScrollable, useFixScroll } from 'hooks/useFixScroll';

interface Params {
  id: string;
}
interface Props {
  isOpen: boolean;
  visited: Visited;
  setVisited: (visited: Visited) => void;
  selectId: number;
  setSelectId: (selectId: number) => void;
  lastVisitedId: number;
  setLastVisitedId: (id: number) => void;
  layout: LayoutType;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
  coords: Coord[];
  worksHistory: number[];
  setWorksHistory: (worksHistory: number[]) => void;
  worksHistoryIndex: number | null;
  setWorksHistoryIndex: (id: number | null) => void;
  mapModeId: MapModeId;
}

const touchable = isMobile || isTablet;

const IndividualPageComponent: React.VFC<RouteComponentProps<Params> & Props> = ({
  isOpen,
  match,
  visited,
  setVisited,
  selectId,
  setSelectId,
  lastVisitedId,
  setLastVisitedId,
  layout,
  setIsShowHamburger,
  coords,
  worksHistory,
  setWorksHistory,
  worksHistoryIndex,
  setWorksHistoryIndex,
  mapModeId,
}) => {
  const worksId = Number(match.params.id);
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);
  const history = useHistory();

  const [isFull, setIsFull] = React.useState<boolean>(false);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useFixScroll(scrollContainerRef, scrollerRef, [isFull, worksId]);

  const scrollTopRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    scrollTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [worksId]);

  React.useEffect(() => {
    if (worksInfo === undefined) {
      history.replace('/error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worksInfo]);

  const isNarrowLayout = layout === 'MID' || layout === 'NARROW';
  const iframeWidth = isFull ? '' : isNarrowLayout ? '95vw' : 'min(1000px, max(75vw , 500px))';
  const iframeHeight = isFull
    ? ''
    : `calc( ${iframeWidth} * ${worksInfo?.aspectRatio && isOpen ? worksInfo.aspectRatio : 9 / 16} )`;

  React.useEffect(() => {
    setLastVisitedId(selectId);
    setSelectId(worksId);
    if (worksHistoryIndex === null || worksHistoryIndex === worksHistory.length) {
      worksHistory.push(worksId);
      setWorksHistory(worksHistory);
    }
    if (worksHistoryIndex === null) {
      setWorksHistoryIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worksId, setSelectId, setWorksHistory, setLastVisitedId, setWorksHistoryIndex]);
  React.useEffect(() => {
    setVisited({ ...visited, [worksId.toString()]: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worksId, setVisited]);

  const suggestIds = React.useMemo<number[]>(() => {
    if (worksInfo === undefined) {
      return [];
    }
    if (mapModeId === 1) {
      const rotateFromSelf = calcRotatedOrderWorksFromSpecificId(worksId);
      const notVisitedRotateSortedIds = rotateFromSelf
        .filter((info) => !visited[info.id] && info.id !== worksId && info.id !== lastVisitedId)
        .map((info) => info.id);
      const visitedRotateSortedIds = rotateFromSelf
        .filter((info) => visited[info.id] && info.id !== worksId && info.id !== lastVisitedId)
        .map((info) => info.id);
      return notVisitedRotateSortedIds.concat(visitedRotateSortedIds);
    }
    const notVisitedSortedIds = sortWorksByDistance(worksId, coords).filter(
      (id) => !visited[id] && id !== worksId && id !== lastVisitedId,
    );
    const visitedSortedIds = sortWorksByDistance(worksId, coords).filter(
      (id) => visited[id] && id !== worksId && id !== lastVisitedId,
    );
    return notVisitedSortedIds.concat(visitedSortedIds);
  }, [worksId, worksInfo, coords, visited, lastVisitedId, mapModeId]);

  const nextRotationOrderWorksId = React.useMemo<number | null>(() => {
    if (worksHistoryIndex !== null && worksHistoryIndex < worksHistory.length - 1) {
      return worksHistory[worksHistoryIndex + 1];
    }
    if (visited[suggestIds[0]]) {
      return calcNextRotationOrderWorksId(worksId);
    }
    return suggestIds[0];
  }, [worksId, suggestIds, visited, worksHistory, worksHistoryIndex]);

  if (worksInfo === undefined) {
    return <></>;
  }
  return (
    <StyledRoot>
      <Header
        showNavigationToTop={true}
        isFull={isFull}
        setIsFull={setIsFull}
        layout={layout}
        setIsShowHamburger={setIsShowHamburger}
      />
      <ScrollContainer ref={scrollContainerRef}>
        <Scroller ref={scrollerRef}>
          <StyledContentContainer>
            {!isFull && <ScrollTopDiv ref={scrollTopRef} />}
            <StyledWorksContainer isFull={isFull} isNarrowLayout={isNarrowLayout} containerWidth={iframeWidth}>
              {!isFull && nextRotationOrderWorksId !== null && (
                <TopNavigationArea
                  nextRotationOrderWorksId={nextRotationOrderWorksId}
                  isNarrowLayout={isNarrowLayout}
                  worksHistory={worksHistory}
                  worksHistoryIndex={worksHistoryIndex}
                  setWorksHistoryIndex={setWorksHistoryIndex}
                />
              )}
              <IndividualWorksWindow
                srcUrl={touchable ? worksInfo.srcUrlSp : worksInfo.srcUrlPc}
                iframeHeight={iframeHeight}
                iframeWidth={iframeWidth}
                isFull={isFull}
                setIsFull={setIsFull}
                isNarrowLayout={isNarrowLayout}
                isShowButtonOnly={!isFull && touchable && worksInfo.isSmartphoneFullscreenOnly === true}
                showLoading={worksInfo.showLoading || false}
                isOpen={isOpen}
                thumbnailBaseName={worksInfo.thumbnailBaseName}
              />
              {!isFull && <IndividualWorksDetail worksInfo={worksInfo} isNarrowLayout={isNarrowLayout} />}
              {!isFull && isOpen && <ReactionForm worksId={worksId} isNarrowLayout={isNarrowLayout} />}
              {!isFull && <NavigationArea suggestIds={suggestIds} visited={visited} isNarrowLayout={isNarrowLayout} />}
              {!isFull && worksInfo.ownQuestionnaireUrl && (
                <OwnQuestionnaire
                  ownQuestionnaireUrl={worksInfo.ownQuestionnaireUrl}
                  isNarrowLayout={isNarrowLayout}
                ></OwnQuestionnaire>
              )}
            </StyledWorksContainer>
          </StyledContentContainer>
        </Scroller>
      </ScrollContainer>
    </StyledRoot>
  );
};

export const IndividualPage = withRouter(IndividualPageComponent);

const StyledRoot = styled.div`
  background-color: ${theme.color.darkGrey};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100% - ${headerHeight}px);
  overflow-y: auto;
`;

const Scroller = styled.div`
  min-height: ${isSmoothScrollable ? `calc(100% - ${headerHeight - 1}px)` : `calc(100% - ${headerHeight}px)`};
`;

const StyledContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollTopDiv = styled.div`
  margin-top: ${isSmoothScrollable ? '1px' : '0'};
`;

interface StyledWorksContainerProps {
  isNarrowLayout: boolean;
  isFull: boolean;
  containerWidth: string;
}

const StyledWorksContainer = styled.div<StyledWorksContainerProps>`
  width: ${({ containerWidth }) => containerWidth};
  display: flex;
  flex-direction: column;
  padding: ${({ isFull }) => (isFull ? '0' : '10px 0px 50px 0px')};
`;
