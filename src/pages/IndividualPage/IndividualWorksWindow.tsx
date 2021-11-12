import { headerHeight } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import React from 'react';
import styled from 'styled-components';

interface Props {
  srcUrl?: string;
  iframeWidth: string;
  iframeHeight: string;
  isFull: boolean;
  setIsFull: (isFull: boolean) => void;
}

export const IndividualWorksWindow: React.VFC<Props> = ({ srcUrl, iframeWidth, iframeHeight, isFull, setIsFull }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const loadHandler = React.useCallback(() => setIsLoading(false), [setIsLoading]);
  const { width, height } = useWindowDimensions();
  React.useEffect(() => {
    setIsLoading(true);
    const iframe = iframeRef.current;
    if (iframe !== null) {
      iframe.addEventListener('load', loadHandler);
    }
    return () => {
      if (iframe !== null) {
        iframe.removeEventListener('load', loadHandler);
      }
    };
  }, [srcUrl, loadHandler]);

  const makeFullScreen = React.useCallback(() => {
    setIsFull(true);
  }, [setIsFull]);

  const exitFullScreen = React.useCallback(() => {
    setIsFull(false);
  }, [setIsFull]);

  return (
    <StyledRoot>
      <StyledContainer
        iframeWidth={iframeWidth || `${width}px`}
        iframeHeight={iframeHeight || `${height - headerHeight}px`}
      >
        {srcUrl ? (
          <StyledIframeContainer>
            <StyledIframe
              src={srcUrl}
              allow="fullscreen *; autoplay *; camera *; microphone *"
              ref={iframeRef}
            ></StyledIframe>
            <StyledLoading isLoading={isLoading}>Loading...</StyledLoading>
          </StyledIframeContainer>
        ) : (
          <StyledSkeleton>
            <p>メンテナンス中</p>
          </StyledSkeleton>
        )}
        {isFull ? (
          <StyledExitFullScreenButton onClick={exitFullScreen}>全画面表示を終了する</StyledExitFullScreenButton>
        ) : (
          <StyledFullScreenButton onClick={makeFullScreen}>
            <StyledSVG width="225" height="113" viewBox="0 0 225 113" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0C0 62.132 50.368 112.5 112.5 112.5C174.632 112.5 225 62.132 225 0H0Z"
                fill="#2A70B8"
              />
            </StyledSVG>
            <p>
              作品を全画面で
              <br />
              表示する
            </p>
          </StyledFullScreenButton>
        )}
      </StyledContainer>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface StyledContainerProps {
  iframeWidth: string;
  iframeHeight: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
  min-width: ${({ iframeWidth }) => iframeWidth};
  width: ${({ iframeWidth }) => iframeWidth};
  height: ${({ iframeHeight }) => iframeHeight};
`;

const StyledIframeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  display: block;
  background-color: white;
`;

interface StyledLoadingProps {
  isLoading: boolean;
}

const StyledLoading = styled.div<StyledLoadingProps>`
  background-color: black;
  color: white;
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const StyledSkeleton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b4b4b4;
`;

const StyledFullScreenButton = styled.button`
  background-color: transparent;
  position: absolute;
  top: 99.5%;
  right: -3px;
  display: block;
  outline: none;
  border: none;
  padding: 3px;
  color: white;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
  & > p {
    position: absolute;
    width: 100%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
  }
`;

const StyledExitFullScreenButton = styled.button`
  position: absolute;
  bottom: 3px;
  right: 3px;
  display: block;
  height: 25px;
  background-color: ${theme.color.primary};
  color: white;
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 3px;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.activePrimary};
  }
`;

const StyledSVG = styled.svg`
  height: 100%;
`;
