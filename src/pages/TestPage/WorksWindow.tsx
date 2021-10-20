import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  srcUrl: string;
  iframeHeight: string;
  isFull: boolean;
  setIsFull: (isFull: boolean) => void;
}

export const WorksWindow: React.VFC<Props> = ({ srcUrl, iframeHeight, isFull, setIsFull }) => {
  const makeFullScreen = React.useCallback(() => {
    setIsFull(true);
  }, [setIsFull]);
  const exitFullScreen = React.useCallback(() => {
    setIsFull(false);
  }, [setIsFull]);
  return (
    <StyledRoot isFull={isFull}>
      <StyledContainer height={iframeHeight}>
        {srcUrl ? (
          <StyledIframe src={srcUrl} allow="fullscreen *; autoplay *; camera *; microphone *"></StyledIframe>
        ) : (
          <StyledSkeleton></StyledSkeleton>
        )}
        {isFull ? <StyledExitFullScreenButton onClick={exitFullScreen}>全画面解除</StyledExitFullScreenButton> : <></>}
      </StyledContainer>
      {isFull ? <></> : <StyledFullScreenButton onClick={makeFullScreen}>全画面表示</StyledFullScreenButton>}
    </StyledRoot>
  );
};

interface StyledRootProps {
  isFull: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${({ isFull }) => (isFull ? '0' : '15px 0 30px 0')};
`;

interface StyledContainerProps {
  height: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
  margin-top: 0px;
  width: 100%;
  height: ${({ height }) => height};
  position: relative;
`;

const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
`;

const StyledSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e7e7e7;
`;

const buttonStyle = css`
  padding: 0px 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  background-color: #303030;
  color: white;
  &:hover {
    background-color: #000000;
    cursor: pointer;
  }
`;

const StyledFullScreenButton = styled.button`
  ${buttonStyle};
  margin-top: 10px;
`;

const StyledExitFullScreenButton = styled.button`
  ${buttonStyle};
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
