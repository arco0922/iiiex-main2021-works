import { Header, headerHeight } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import styled from 'styled-components';
import { IndividualWorksDetail } from './IndividualWorksDetail';
import { IndividualWorksWindow } from './IndividualWorksWindow';
import { isMobile } from 'react-device-detect';
import { Visited } from 'AppRoot';
import { LayoutType } from 'constants/Layout';
import { Coord } from 'constants/MapCoords';
import { sortWorksByDistance } from 'utils/sortWorks';

interface Params {
  id: string;
}
interface Props {
  selectId: number;
  setSelectId: (selectId: number) => void;
  setVisited: (visited: Visited) => void;
  visited: Visited;
  layout: LayoutType;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
  coords: Coord[];
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params> & Props> = ({
  match,
  selectId,
  setSelectId,
  setVisited,
  visited,
  layout,
  setIsShowHamburger,
  coords,
}) => {
  const worksId = Number(match.params.id);
  const worksInfo = React.useMemo(() => worksInfoArr.filter((info) => info.id === worksId)[0], [worksId]);
  const history = useHistory();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [lastVisitedId, setLastVisitedId] = React.useState<number>(-1);
  React.useEffect(() => {
    containerRef.current?.scrollIntoView({
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
  const iframeWidth = isFull ? '' : isNarrowLayout ? '95vw' : 'max(60vw , 500px)';
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
    const notVisitedSortedIds = sortWorksByDistance(worksId, coords).filter((id) => !visited[id] && id !== worksId);
    const visitedSortedIds = sortWorksByDistance(worksId, coords).filter((id) => visited[id] && id !== worksId);
    const filteredSuggestIds = notVisitedSortedIds.concat(visitedSortedIds);
    if (filteredSuggestIds[0] == lastVisitedId) {
      filteredSuggestIds.shift();
    }
    return filteredSuggestIds;
  }, [worksId, worksInfo, coords, visited, lastVisitedId]);

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
        <ScrollDiv ref={containerRef}></ScrollDiv>
        <StyledWorksContainer isFull={isFull} isNarrowLayout={isNarrowLayout}>
          <IndividualWorksWindow
            srcUrl={isMobile ? worksInfo.srcUrlSp : worksInfo.srcUrlPc}
            iframeHeight={iframeHeight}
            iframeWidth={iframeWidth}
            isFull={isFull}
            setIsFull={setIsFull}
          />
          {!isFull && <IndividualWorksDetail worksInfo={worksInfo} suggestIds={suggestIds} visited={visited} />}
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
`;

const ScrollDiv = styled.div``;

interface StyledWorksContainerProps {
  isNarrowLayout: boolean;
  isFull: boolean;
}

const StyledWorksContainer = styled.div<StyledWorksContainerProps>`
  display: flex;
  justify-content: center;
  flex-direction: ${({ isNarrowLayout }) => (isNarrowLayout ? 'column' : 'row')};
  padding: ${({ isFull }) => (isFull ? '0' : '20px 10px')};
`;
