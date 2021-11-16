import { Header, headerHeight } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import styled from 'styled-components';
import { IndividualWorksDetail } from './IndividualWorksDetail';
import { IndividualWorksWindow } from './IndividualWorksWindow';
import { ReactionForm } from './ReactionForm';
import { isMobile } from 'react-device-detect';
import { Visited } from 'AppRoot';
import { LayoutType } from 'constants/Layout';
import { Coord } from 'constants/MapCoords';
import { sortWorksByDistance } from 'utils/sortWorks';
import { NavigationArea } from './NavigationArea';
import { TopNavigationArea } from './TopNavigationArea';
import { calcNextRotationOrderWorksId } from 'utils/calcRotationUtils';
import { isSmoothScrollable, useFixScroll } from 'hooks/useFixScroll';

interface Params {
  id: string;
}
interface Props {
  visited: Visited;
  setVisited: (visited: Visited) => void;
  selectId: number;
  setSelectId: (selectId: number) => void;
  lastVisitedId: number;
  setLastVisitedId: (id: number) => void;
  layout: LayoutType;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
  coords: Coord[];
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params> & Props> = ({
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
}) => {
  const worksId = Number(match.params.id);
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);
  const history = useHistory();

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useFixScroll(scrollContainerRef, scrollerRef);

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
  const [isFull, setIsFull] = React.useState<boolean>(false);
  const isNarrowLayout = layout === 'MID' || layout === 'NARROW';
  const iframeWidth = isFull ? '' : isNarrowLayout ? '95vw' : 'min(1000px, max(75vw , 500px))';
  const iframeHeight = isFull
    ? ''
    : `calc( ${iframeWidth} * ${worksInfo?.aspectRatio ? worksInfo.aspectRatio : 9 / 16} )`;

  React.useEffect(() => {
    setLastVisitedId(selectId);
    setSelectId(worksId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worksId, setSelectId]);
  React.useEffect(() => {
    setVisited({ ...visited, [worksId.toString()]: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worksId, setVisited]);

  const suggestIds = React.useMemo<number[]>(() => {
    if (worksInfo === undefined) {
      return [];
    }
    const notVisitedSortedIds = sortWorksByDistance(worksId, coords).filter(
      (id) => !visited[id] && id !== worksId && id !== lastVisitedId,
    );
    const visitedSortedIds = sortWorksByDistance(worksId, coords).filter(
      (id) => visited[id] && id !== worksId && id !== lastVisitedId,
    );
    return notVisitedSortedIds.concat(visitedSortedIds);
  }, [worksId, worksInfo, coords, visited, lastVisitedId]);

  const nextRotationOrderWorksId = React.useMemo<number | null>(() => calcNextRotationOrderWorksId(worksId), [worksId]);

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
                />
              )}
              <IndividualWorksWindow
                srcUrl={isMobile ? worksInfo.srcUrlSp : worksInfo.srcUrlPc}
                iframeHeight={iframeHeight}
                iframeWidth={iframeWidth}
                isFull={isFull}
                setIsFull={setIsFull}
                isNarrowLayout={isNarrowLayout}
                isShowButtonOnly={!isFull && isMobile && worksInfo.isSmartphoneFullscreenOnly === true}
              />
              {!isFull && <IndividualWorksDetail worksInfo={worksInfo} isNarrowLayout={isNarrowLayout} />}
              {!isFull && <ReactionForm worksId={worksId} isNarrowLayout={isNarrowLayout} />}
              {!isFull && <NavigationArea suggestIds={suggestIds} visited={visited} isNarrowLayout={isNarrowLayout} />}
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
