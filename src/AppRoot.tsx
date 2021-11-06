import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { IndividualPage } from 'pages/IndividualPage/IndividualPage';
import { TestPage } from 'pages/TestPage/TestPage';
import { TopPage } from 'pages/TopPage/TopPage';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { worksInfoArr } from 'constants/WorksInfo';
import useLocalStorage from 'use-local-storage';
import { MapModeId } from 'constants/MapCoords';
import { layoutBorder, LayoutType } from 'constants/Layout';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import styled from 'styled-components';
import { HamburgerMenu } from 'components/HamburgerMenu/HamburgerMenu';

export interface Visited {
  [key: string]: boolean;
}

const initailVisited = (() => {
  const tmp: Visited = {};
  worksInfoArr.forEach((worksInfo) => {
    tmp[worksInfo.id.toString()] = false;
  });
  return tmp;
})();

const initialSelectId = Math.floor(Math.random() * (worksInfoArr.length - 1));

export const AppRoot: React.VFC = () => {
  /** 本番環境用のビルドの場合は、/testのルーティングは作らない */
  const isProd = process.env.PHASE === 'production';

  const [selectId, setSelectId] = React.useState<number>(initialSelectId);
  const [visited, setVisited] = useLocalStorage<Visited>('visited', initailVisited);
  const [mapModeId, setMapModeId] = useLocalStorage<MapModeId>('mapModeId', 1);

  const [layout, setLayout] = React.useState<LayoutType>('WIDE');
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
              setMapModeId={setMapModeId}
              layout={layout}
              isShowHamburgerRef={isShowHamburgerRef}
              setIsShowHamburger={setIsShowHamburger}
            />
          </Route>
          <Route path="/works/:id" exact>
            <IndividualPage
              visited={visited}
              setVisited={setVisited}
              setSelectId={setSelectId}
              layout={layout}
              setIsShowHamburger={setIsShowHamburger}
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
`;

const HamburgerBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000c8;
  z-index: 8;
  position: absolute;
  top: 0;
  left: 0;
`;
