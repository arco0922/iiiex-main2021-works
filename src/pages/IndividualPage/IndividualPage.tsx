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
import { NavigationArea } from './NavigationArea';

interface Params {
  id: string;
}
interface Props {
  setSelectId: (selectId: number) => void;
  setVisited: (visited: Visited) => void;
  visited: Visited;
  layout: LayoutType;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
  coords: Coord[];
}

const IndividualPageComponent: React.VFC<RouteComponentProps<Params> & Props> = ({
  match,
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
  const iframeWidth = isFull ? '' : isNarrowLayout ? '95vw' : 'min(1500px, max(75vw , 500px))';
  const iframeHeight = isFull
    ? ''
    : `calc( ${iframeWidth} * ${worksInfo?.aspectRatio ? worksInfo.aspectRatio : 9 / 16} )`;

  React.useEffect(() => {
    setSelectId(worksId);
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
    return notVisitedSortedIds.concat(visitedSortedIds);
  }, [worksId, worksInfo, coords, visited]);

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
          {!isFull && <IndividualWorksDetail worksInfo={worksInfo} />}
          {!isFull && <NavigationArea isFull={isFull} suggestIds={suggestIds} visited={visited} />}
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
}

const StyledWorksContainer = styled.div<StyledWorksContainerProps>`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: ${({ isFull }) => (isFull ? '0' : '20px 10px')};
`;
