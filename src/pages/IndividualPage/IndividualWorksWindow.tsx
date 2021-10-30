import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';

interface Props {
  srcUrl?: string;
  iframeWidth: string;
  iframeHeight: string;
}

export const IndividualWorksWindow: React.VFC<Props> = ({ srcUrl, iframeWidth, iframeHeight }) => {
  return (
    <div>
      <StyledContainer iframeWidth={iframeWidth} iframeHeight={iframeHeight}>
        {srcUrl && <StyledIframe src={srcUrl} allow="fullscreen *; autoplay *; camera *; microphone *"></StyledIframe>}
      </StyledContainer>
    </div>
  );
};

interface StyledContainerProps {
  iframeWidth: string;
  iframeHeight: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${({ iframeWidth }) => iframeWidth};
  height: ${({ iframeHeight }) => iframeHeight};
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  display: block;
  background-color: white;
`;
