import { MapCoords, mapCoordsArr, MapModeId } from 'constants/MapCoords';
import { theme } from 'constants/Theme';
import React from 'react';
import styled from 'styled-components';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import ArrowLeftSharpIcon from '@mui/icons-material/ArrowLeftSharp';

interface Props {
  mapModeId: MapModeId;
  setMapModeId: (mapMode: MapModeId) => void;
}

const rotateArr = mapCoordsArr.concat(mapCoordsArr);
const rotateLength = rotateArr.length;

export const Carousel: React.VFC<Props> = ({ mapModeId, setMapModeId }) => {
  const [centerIdx, setCenterIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    const initialCenterIdx = mapCoordsArr.findIndex(({ modeId }) => modeId === mapModeId);
    setCenterIdx(initialCenterIdx);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incrementHandler = React.useCallback(() => {
    if (centerIdx === null) {
      return;
    }
    setCenterIdx((centerIdx + 1) % rotateLength);
  }, [centerIdx]);

  const decrementHandler = React.useCallback(() => {
    if (centerIdx === null) {
      return;
    }
    setCenterIdx((centerIdx - 1 + rotateLength) % rotateLength);
  }, [centerIdx]);

  return (
    <StyledRoot>
      <StyledContainer>
        <StyledTitle>作品の並べ方</StyledTitle>
        <svg width="5" height="11" viewBox="0 0 5 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 11L0.334936 0.5H4.66506L2.5 11Z" fill="white" />
        </svg>

        {centerIdx !== null && centerIdx >= 0 && (
          <StyledCarouselContainer>
            <StyledCarouselLeftItemContainer onClick={decrementHandler} />
            <StyledCarouselJustItemContainer />
            <StyledCarouselRightItemContainer onClick={incrementHandler} />
            <StyledArrowLeft fontSize="large" onClick={decrementHandler} />
            <StyledArrowRight fontSize="large" onClick={incrementHandler} />
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

const StyledRoot = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  overflow: hidden;
`;

const StyledContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h3`
  font-size: 12px;
  font-weight: ${theme.fontWeight.regular};
`;

const StyledCarouselContainer = styled.div`
  width: 100%;
  height: 50px;
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
  left: 225px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  &:hover {
    cursor: pointer;
  }
`;

const StyledArrowLeft = styled(ArrowLeftSharpIcon)`
  position: absolute;
  right: 225px;
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
  width: 100px;
  height: 100%;
  transition: all 500ms ease-in-out;
  color: #525252;
  font-size: 16px;
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
    left: -125px;
  }
  &.one-before {
    left: 0px;
  }
  &.just {
    left: 125px;
    color: white;
  }
  &.one-after {
    left: 250px;
  }
  &.two-after {
    left: 375px;
  }
`;

const StyledButton = styled.button`
  z-index: 20;
`;
