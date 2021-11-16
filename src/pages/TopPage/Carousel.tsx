import { mapCoordsArr, MapModeId } from 'constants/MapCoords';
import { theme } from 'constants/Theme';
import React from 'react';
import styled from 'styled-components';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import ArrowLeftSharpIcon from '@mui/icons-material/ArrowLeftSharp';
import { LayoutType } from 'constants/Layout';
import { isMobile, isTablet } from 'react-device-detect';

interface Props {
  layout: LayoutType;
  mapModeId: MapModeId;
  setMapModeId: (mapMode: MapModeId) => void;
  isCursorOnCarouselRef: React.MutableRefObject<boolean>;
}

const touchable = isMobile || isTablet;

const rotateArr = mapCoordsArr.concat(mapCoordsArr).concat(mapCoordsArr);
const rotateLength = rotateArr.length;

export const Carousel: React.VFC<Props> = ({ layout, mapModeId, setMapModeId, isCursorOnCarouselRef }) => {
  const [centerIdx, setCenterIdx] = React.useState<number | null>(null);
  const [isRotating, setIsRotating] = React.useState<boolean>(false);

  React.useEffect(() => {
    const initialCenterIdx = mapCoordsArr.findIndex(({ modeId }) => modeId === mapModeId);
    setCenterIdx(initialCenterIdx);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickTouchStartHandler = React.useCallback(
    () => (isCursorOnCarouselRef.current = true),
    [isCursorOnCarouselRef],
  );

  const clickTouchEndHandler = React.useCallback(
    () => (isCursorOnCarouselRef.current = false),
    [isCursorOnCarouselRef],
  );

  React.useEffect(() => {
    window.addEventListener('mouseup', clickTouchEndHandler);
    window.addEventListener('touchend', clickTouchEndHandler);
    return () => {
      window.removeEventListener('mouseup', clickTouchEndHandler);
      window.addEventListener('touchend', clickTouchEndHandler);
    };
  }, [clickTouchEndHandler]);

  const increment = React.useCallback(() => {
    if (centerIdx === null || isRotating) {
      return;
    }
    setIsRotating(true);
    const newCenterIdx = (centerIdx + 1) % rotateLength;
    setCenterIdx(newCenterIdx);
    setMapModeId(rotateArr[newCenterIdx].modeId);
    setTimeout(() => setIsRotating(false), 300);
  }, [centerIdx, setMapModeId, isRotating]);

  const decrement = React.useCallback(() => {
    if (centerIdx === null || isRotating) {
      return;
    }
    setIsRotating(true);
    const newCenterIdx = (centerIdx - 1 + rotateLength) % rotateLength;
    setCenterIdx(newCenterIdx);
    setMapModeId(rotateArr[newCenterIdx].modeId);
    setTimeout(() => setIsRotating(false), 300);
  }, [centerIdx, setMapModeId, isRotating]);

  const incrementClickHandler = React.useCallback(() => {
    if (touchable) {
      return;
    }
    increment();
  }, [increment]);

  const incrementTouchHandler = React.useCallback(() => {
    if (!touchable) {
      return;
    }
    increment();
  }, [increment]);

  const decrementClickHandler = React.useCallback(() => {
    if (touchable) {
      return;
    }
    decrement();
  }, [decrement]);

  const decrementTouchHandler = React.useCallback(() => {
    if (!touchable) {
      return;
    }
    decrement();
  }, [decrement]);

  return (
    <StyledRoot className={layout === 'NARROW' ? 'narrow' : ''}>
      <StyledContainer onMouseDown={clickTouchStartHandler} onTouchStart={clickTouchStartHandler}>
        <StyledTitle>作品の並べ方</StyledTitle>
        <svg width="5" height="11" viewBox="0 0 5 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 11L0.334936 0.5H4.66506L2.5 11Z" fill="white" />
        </svg>

        {centerIdx !== null && centerIdx >= 0 && (
          <StyledCarouselContainer>
            <StyledCarouselLeftItemContainer onMouseDown={decrementClickHandler} onTouchStart={decrementTouchHandler} />
            <StyledCarouselJustItemContainer />
            <StyledCarouselRightItemContainer
              onMouseDown={incrementClickHandler}
              onTouchStart={incrementTouchHandler}
            />
            <StyledArrowLeft
              fontSize="large"
              onMouseDown={decrementClickHandler}
              onTouchStart={decrementTouchHandler}
            />
            <StyledArrowRight
              fontSize="large"
              onMouseDown={incrementClickHandler}
              onTouchStart={incrementTouchHandler}
            />
            {rotateArr.map(({ modeName }, idx) => {
              let className = '';
              switch (idx) {
                case (centerIdx - 2 + rotateLength) % rotateLength:
                  className = 'two-before transparent';
                  break;
                case (centerIdx - 1 + rotateLength) % rotateLength:
                  className = 'one-before show';
                  break;
                case centerIdx:
                  className = 'just show';
                  break;
                case (centerIdx + 1) % rotateLength:
                  className = 'one-after show';
                  break;
                case (centerIdx + 2) % rotateLength:
                  className = 'two-after transparent';
                  break;
              }
              return (
                <StyledCarouselItem className={className} key={idx}>
                  {modeName}
                </StyledCarouselItem>
              );
            })}
          </StyledCarouselContainer>
        )}
      </StyledContainer>
    </StyledRoot>
  );
};

const carouselItemWidth = 80;
const carouselItemGap = 25;

export const carouselSpaceHeight = 85;

const StyledRoot = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 15;
  color: white;
  &.narrow {
    top: 5px;
    left: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledContainer = styled.div`
  width: ${3 * carouselItemWidth + 2 * carouselItemGap + 10}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  border: 1px solid white;
  border-radius: 10px;
  overflow-x: hidden;
  background-color: black;
`;

const StyledTitle = styled.h3`
  font-size: 10px;
  font-weight: ${theme.fontWeight.regular};
`;

const StyledCarouselContainer = styled.div`
  width: 100%;
  height: 35px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
`;

const StyledCarouselFixedItemContainer = styled.div`
  flex: 1;
  height: 100%;
  z-index: 17;
`;

const StyledCarouselJustItemContainer = styled(StyledCarouselFixedItemContainer)`
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`;

const StyledCarouselRightItemContainer = styled(StyledCarouselFixedItemContainer)`
  &:hover {
    cursor: pointer;
  }
`;
const StyledCarouselLeftItemContainer = styled(StyledCarouselFixedItemContainer)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledArrowRight = styled(ArrowRightSharpIcon)`
  position: absolute;
  left: ${2 * carouselItemWidth + carouselItemGap}px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  &:hover {
    cursor: pointer;
  }
`;

const StyledArrowLeft = styled(ArrowLeftSharpIcon)`
  position: absolute;
  right: ${2 * carouselItemWidth + carouselItemGap}px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  &:hover {
    cursor: pointer;
  }
`;

const StyledCarouselItem = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  width: ${carouselItemWidth}px;
  height: 100%;
  transition: all 500ms ease-in-out;
  color: #525252;
  font-size: 12px;
  &.show {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  &.transparent {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
  }
  &.two-before {
    left: ${-(carouselItemWidth + carouselItemGap)}px;
  }
  &.one-before {
    left: 0px;
  }
  &.just {
    left: ${carouselItemWidth + carouselItemGap}px;
    color: white;
  }
  &.one-after {
    left: ${2 * (carouselItemWidth + carouselItemGap)}px;
  }
  &.two-after {
    left: ${3 * (carouselItemWidth + carouselItemGap)}px;
  }
`;
