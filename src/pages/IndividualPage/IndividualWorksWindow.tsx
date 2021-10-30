import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  srcUrl?: string;
  iframeWidth: string;
  iframeHeight: string;
}

export const IndividualWorksWindow: React.VFC<Props> = ({ srcUrl, iframeWidth, iframeHeight }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const loadHandler = React.useCallback(() => setIsLoading(false), [setIsLoading]);
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

  return (
    <StyledRoot>
      <StyledContainer iframeWidth={iframeWidth} iframeHeight={iframeHeight}>
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
      </StyledContainer>
      <StyledButton>
        <StyledLink to="/">作品一覧へ戻る</StyledLink>
      </StyledButton>
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
  width: ${({ iframeWidth }) => iframeWidth};
  height: ${({ iframeHeight }) => iframeHeight};
`;

const StyledIframeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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

const StyledButton = styled.button`
  display: block;
  margin-top: 15px;
  background-color: ${theme.color.primary};
  outline: none;
  border: none;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.activePrimary};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  font-size: 15px;
  text-decoration: none;
  color: white;
`;
