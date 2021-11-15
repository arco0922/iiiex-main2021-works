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

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({
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
      <StyledContentContainer>
        <ScrollDiv ref={scrollRef}></ScrollDiv>
        <StyledWorksContainer isFull={isFull} isNarrowLayout={isNarrowLayout} containerWidth={iframeWidth}>
          {!isFull && nextRotationOrderWorksId !== null && (
            <TopNavigationArea nextRotationOrderWorksId={nextRotationOrderWorksId} isNarrowLayout={isNarrowLayout} />
          )}
          <IndividualWorksWindow
            srcUrl={isMobile ? worksInfo.srcUrlSp : worksInfo.srcUrlPc}
            iframeHeight={iframeHeight}
            iframeWidth={iframeWidth}
            isFull={isFull}
            setIsFull={setIsFull}
            isNarrowLayout={isNarrowLayout}
          />
          {!isFull && <IndividualWorksDetail worksInfo={worksInfo} isNarrowLayout={isNarrowLayout} />}
          {!isFull && <ReactionForm worksId={worksId} isNarrowLayout={isNarrowLayout} />}
          {!isFull && <NavigationArea suggestIds={suggestIds} visited={visited} isNarrowLayout={isNarrowLayout} />}
        </StyledWorksContainer>
      </StyledContentContainer>
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

const StyledContentContainer = styled.div`
  width: 100%;
  height: calc(100% - ${headerHeight}px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollDiv = styled.div``;

interface StyledWorksContainerProps {
  isNarrowLayout: boolean;
  isFull: boolean;
  containerWidth: string;
}

const StyledWorksContainer = styled.div<StyledWorksContainerProps>`
  width: ${({ containerWidth }) => containerWidth};
  display: flex;
  flex-direction: column;
  padding: ${({ isFull }) => (isFull ? '0' : '15px 0px 50px 0px')};
`;
