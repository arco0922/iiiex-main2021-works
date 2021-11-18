import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { IndividualPage } from 'pages/IndividualPage/IndividualPage';
import { TestPage } from 'pages/TestPage/TestPage';
import { TopPage } from 'pages/TopPage/TopPage';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { worksInfoArr } from 'constants/WorksInfo';
import useLocalStorage from 'use-local-storage';
import { Coord, mapCoordsArr, MapModeId } from 'constants/MapCoords';
import { layoutBorder, LayoutType } from 'constants/Layout';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import styled from 'styled-components';
import { HamburgerMenu } from 'components/HamburgerMenu/HamburgerMenu';

export interface Visited {
  [key: string]: boolean;
}

const initialVisited = (() => {
  const tmp: Visited = {};
  worksInfoArr.forEach((worksInfo) => {
    tmp[worksInfo.id.toString()] = false;
  });
  return tmp;
})();

const initialWorks = worksInfoArr.filter((works) => {
  return works.isInitial;
});
export const initialSelectId = initialWorks[Math.floor(Math.random() * initialWorks.length)].id;

export const initialMapModeId: MapModeId = 1;

export const AppRoot: React.VFC = () => {
  /** 本番環境用のビルドの場合は、/testのルーティングは作らない */
  const isProd = process.env.PHASE === 'production';

  const [selectId, setSelectId] = React.useState<number>(initialSelectId);
  const [visited, setVisited] = useLocalStorage<Visited>('visited', initialVisited);
  const visitedRef = React.useRef<Visited>(initialVisited);
  React.useEffect(() => {
    visitedRef.current = visited;
  }, [visited]);

  const [lastVisitedId, setLastVisitedId] = React.useState<number>(-1);
  const [worksHistory, setWorksHistory] = React.useState<number[]>([]);
  const [worksHistoryIndex, setWorksHistoryIndex] = React.useState<number | null>(null);

  const [mapModeId, setMapModeId] = React.useState<MapModeId>(initialMapModeId);
  const mapModeIdRef = React.useRef<MapModeId>(initialMapModeId);

  React.useEffect(() => {
    if (isProd) {
      return;
    }
    setVisited(initialVisited);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    mapModeIdRef.current = mapModeId;
  }, [mapModeId]);

  const [layout, setLayout] = React.useState<LayoutType | null>(null);
  const { height, width } = useWindowDimensions();
  React.useEffect(() => {
    if (width < layoutBorder.narrow) {
      setLayout('NARROW');
    } else if (width < layoutBorder.midium) {
      setLayout('MID');
    } else {
      setLayout('WIDE');
    }
  }, [setLayout, width]);

  const [isShowHamburger, setIsShowHamburger] = React.useState<boolean>(false);
  const isShowHamburgerRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    isShowHamburgerRef.current = isShowHamburger;
  }, [isShowHamburger]);

  const [coords, setCoords] = React.useState<Coord[]>(mapCoordsArr.filter(({ modeId }) => modeId === 1)[0].coords);

  if (layout === null) {
    return null;
  }

  return (
    <StyledRoot containerWidth={width} containerHeight={height}>
      <Router>
        <HamburgerMenu
          isShowHamburger={isShowHamburger}
          setIsShowHamburger={setIsShowHamburger}
          visited={visited}
        ></HamburgerMenu>
        {isShowHamburger && <HamburgerBackground onClick={() => setIsShowHamburger(false)} />}
        <Switch>
          <Route path="/" exact>
            <TopPage
              visited={visited}
              selectId={selectId}
              setSelectId={setSelectId}
              mapModeId={mapModeId}
              setMapModeId={setMapModeId}
              mapModeIdRef={mapModeIdRef}
              layout={layout}
              isShowHamburgerRef={isShowHamburgerRef}
              setIsShowHamburger={setIsShowHamburger}
              setCoords={setCoords}
              visitedRef={visitedRef}
              setWorksHistory={setWorksHistory}
              setWorksHistoryIndex={setWorksHistoryIndex}
            />
          </Route>
          <Route path="/works/:id" exact>
            <IndividualPage
              visited={visited}
              setVisited={setVisited}
              selectId={selectId}
              setSelectId={setSelectId}
              lastVisitedId={lastVisitedId}
              setLastVisitedId={setLastVisitedId}
              layout={layout}
              setIsShowHamburger={setIsShowHamburger}
              coords={coords}
              worksHistory={worksHistory}
              setWorksHistory={setWorksHistory}
              worksHistoryIndex={worksHistoryIndex}
              setWorksHistoryIndex={setWorksHistoryIndex}
              mapModeId={mapModeId}
            />
          </Route>
          {!isProd && (
            <Route path="/test" exact>
              <TestPage />
            </Route>
          )}
          <Route path="*">
            <ErrorPage layout={layout} setIsShowHamburger={setIsShowHamburger} />
          </Route>
        </Switch>
      </Router>
    </StyledRoot>
  );
};

interface StyledRootProps {
  containerWidth: number;
  containerHeight: number;
}

const StyledRoot = styled.div<StyledRootProps>`
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerHeight }) => `${containerHeight}px`};
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
  touch-action: none;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -webkit-touch-callout: none;
`;

const HamburgerBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000c8;
  z-index: 19;
  position: absolute;
  top: 0;
  left: 0;
`;
