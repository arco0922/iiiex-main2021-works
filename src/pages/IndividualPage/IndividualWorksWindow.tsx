import { headerHeight } from 'components/Header/Header';
import { LayoutType } from 'constants/Layout';
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
  isNarrowLayout: boolean;
}

export const IndividualWorksWindow: React.VFC<Props> = ({
  srcUrl,
  iframeWidth,
  iframeHeight,
  isFull,
  setIsFull,
  isNarrowLayout,
}) => {
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
          <StyledFullScreenButtonContainer>
            {isNarrowLayout ? (
              <StyledNarrowFullScreenButton onClick={makeFullScreen}>
                <StyledSVG width="252" height="43" viewBox="0 0 252 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M126 43L0.426331 0.25L251.574 0.25L126 43Z" fill="#E3E1E1" />
                </StyledSVG>
                <p>全画面表示</p>
              </StyledNarrowFullScreenButton>
            ) : (
              <StyledFullScreenButton onClick={makeFullScreen}>
                <StyledSVG
                  width="225"
                  height="113"
                  viewBox="0 0 225 113"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
          </StyledFullScreenButtonContainer>
        )}
      </StyledContainer>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  width: 100%;
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
  z-index: 17;
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

const StyledFullScreenButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0px;
`;

const StyledNarrowFullScreenButton = styled.button`
  background-color: transparent;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  outline: none;
  border: none;
  color: black;
  z-index: 16;
  &:hover {
    cursor: pointer;
  }
  & > p {
    position: absolute;
    top: 33%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    line-height: 20px;
    font-weight: ${theme.fontWeight.bold};
    border-bottom: 2px solid ${theme.color.primary};
  }
`;

const StyledFullScreenButton = styled.button`
  background-color: transparent;
  position: absolute;
  top: 0px;
  right: 0px;
  display: block;
  outline: none;
  border: none;
  color: white;
  z-index: 16;
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
  z-index: 18;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.activePrimary};
  }
`;

const StyledSVG = styled.svg`
  height: 100%;
`;
