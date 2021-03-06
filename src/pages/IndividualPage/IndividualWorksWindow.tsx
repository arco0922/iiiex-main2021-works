import { headerHeight } from 'components/Header/Header';
import { LoadingSpinner } from 'components/Loading/LoadingSpinner';
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
  isShowButtonOnly: boolean;
  showLoading: boolean;
  isOpen: boolean;
  thumbnailBaseName: string;
}

export const IndividualWorksWindow: React.VFC<Props> = ({
  srcUrl,
  iframeWidth,
  iframeHeight,
  isFull,
  setIsFull,
  isNarrowLayout,
  isShowButtonOnly,
  showLoading,
  isOpen,
  thumbnailBaseName,
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
  }, [srcUrl, loadHandler, isShowButtonOnly]);

  const makeFullScreen = React.useCallback(() => {
    setIsFull(true);
  }, [setIsFull]);

  const exitFullScreen = React.useCallback(() => {
    setIsFull(false);
  }, [setIsFull]);

  if (!isOpen) {
    return (
      <StyledContainer
        iframeWidth={iframeWidth || `${width}px`}
        iframeHeight={iframeHeight || `${height - headerHeight}px`}
      >
        <StyledEndSkeleton>
          <StyledEndThumbnail src={`/static/assets/thumbnails/${thumbnailBaseName}.jpg`} height="60%" />
          <p>公開期間は終了しました</p>
        </StyledEndSkeleton>
      </StyledContainer>
    );
  }

  return (
    <StyledRoot iframeHeight={iframeHeight} isShowButtonOnly={isShowButtonOnly}>
      {isShowButtonOnly ? (
        <StyledOnlyButtonContainer>
          <StyledPlayButton onClick={makeFullScreen}>
            <p>作品を体験する</p>
          </StyledPlayButton>
        </StyledOnlyButtonContainer>
      ) : (
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
                isLoading={isLoading && showLoading}
              ></StyledIframe>
              <StyledLoading isLoading={isLoading && showLoading}>
                <LoadingSpinner />
              </StyledLoading>
            </StyledIframeContainer>
          ) : (
            <StyledSkeleton>
              <p>メンテナンス中</p>
            </StyledSkeleton>
          )}
          {isFull ? (
            <>
              {isNarrowLayout ? (
                <StyledNarrowExitFullScreenButton onClick={exitFullScreen}>
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13.5L8.39348 8.14285L15.787 13.5" stroke="white" strokeWidth="2" />
                    <path d="M1.29639 7.35714L8.68987 2L16.0834 7.35714" stroke="white" strokeWidth="2" />
                  </svg>
                  <p>全画面表示終了</p>
                </StyledNarrowExitFullScreenButton>
              ) : (
                <StyledExitFullScreenButton onClick={exitFullScreen}>
                  <StyledSVG
                    width="166"
                    height="83"
                    viewBox="0 0 166 83"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M166 83.5C166 37.6604 128.84 0.5 83 0.5C37.1604 0.5 0 37.6604 0 83.5L166 83.5Z"
                      fill="#2A70B8"
                    />
                  </StyledSVG>
                  <p>
                    全画面表示を
                    <br />
                    終了する
                  </p>
                </StyledExitFullScreenButton>
              )}
            </>
          ) : (
            <StyledFullScreenButtonContainer>
              {isNarrowLayout ? (
                <StyledNarrowFullScreenButton onClick={makeFullScreen}>
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
      )}
    </StyledRoot>
  );
};

interface StyledRootProps {
  iframeHeight: string;
  isShowButtonOnly: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
  width: 100%;
  min-height: ${({ iframeHeight, isShowButtonOnly }) => (isShowButtonOnly ? '70px' : `${iframeHeight}`)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledOnlyButtonContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  height: 70px;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPlayButton = styled.button`
  width: 230px;
  height: 70px;
  outline: none;
  border: none;
  border: 2px solid white;
  border-radius: 35px;
  background-color: transparent;
  & > p {
    color: white;
    font-size: 18px;
  }
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

const StyledEndSkeleton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const StyledEndThumbnail = styled.img`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  margin-bottom: 20px;
`;

const StyledIframeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface StyledLoadingProps {
  isLoading: boolean;
}

const StyledIframe = styled.iframe<StyledLoadingProps>`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  display: block;
  background-color: ${({ isLoading }) => (isLoading ? 'black' : 'white')};
  z-index: 17;
`;

const StyledLoading = styled.div<StyledLoadingProps>`
  background-color: #000000a4;
  color: white;
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 17;
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

export const narrowFullScreenButtonWidth = 90;

const StyledNarrowFullScreenButton = styled.button`
  background-color: transparent;
  position: absolute;
  top: 0px;
  right: 0px;
  width: ${narrowFullScreenButtonWidth}px;
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
    font-size: 11px;
  }
`;

export const wideFullScreenButtonWidth = 130;

const StyledFullScreenButton = styled.button`
  background-color: transparent;
  position: absolute;
  top: 0px;
  right: 0px;
  width: ${wideFullScreenButtonWidth}px;
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
    font-size: 13px;
  }
`;

const StyledNarrowExitFullScreenButton = styled.button`
  background-color: black;
  position: fixed;
  bottom: 0px;
  right: 0px;
  display: flex;
  outline: none;
  border: none;
  border: 1px solid ${theme.color.primary};
  color: white;
  padding: 5px 5px;
  z-index: 50;
  &:hover {
    cursor: pointer;
  }
  & > p {
    font-size: 12px;
    margin-left: 3px;
  }
`;

const StyledExitFullScreenButton = styled.button`
  background-color: transparent;
  position: fixed;
  bottom: -3px;
  right: -12px;
  display: block;
  outline: none;
  border: none;
  color: white;
  height: 60px;
  width: 120px;
  z-index: 50;
  &:hover {
    cursor: pointer;
  }
  & > p {
    position: absolute;
    width: 100%;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
`;

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
`;
