import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  srcUrl: string;
  isFull: boolean;
  setFull: (isfull: boolean) => void;
}

export const WorksWindow: React.VFC<Props> = ({ srcUrl, isFull, setFull }) => {
  const [windowWidth, setWindowWidth] = React.useState<string>('100%');
  const [windowHeight, setWindowHeight] = React.useState<string>('500px');
  const fullScreen = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setFull(true);
      setWindowWidth('100vw');
      setWindowHeight('100vh');
    },
    [setFull],
  );
  const exitfullScreen = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setFull(false);
      setWindowWidth('100%');
      setWindowHeight('500px');
    },
    [setFull],
  );
  return (
    <>
      <StyledContainer width={windowWidth} height={windowHeight}>
        {srcUrl ? <StyledIframe src={srcUrl}></StyledIframe> : <StyledSkeleton></StyledSkeleton>}
      </StyledContainer>
      {isFull ? <></> : <StyledFullScreenButton onClick={fullScreen}>全画面表示</StyledFullScreenButton>}
      {isFull ? <StyledExitFullScreenButton onClick={exitfullScreen}>全画面解除</StyledExitFullScreenButton> : <></>}
    </>
  );
};

interface ContainerProps {
  width: string;
  height: string;
}

const StyledContainer = styled.div<ContainerProps>`
  margin-top: 0px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
  height: 500px;
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
  margin-top: 0px;
`;
