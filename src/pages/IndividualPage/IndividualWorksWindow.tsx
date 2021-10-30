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
  return (
    <StyledRoot>
      <StyledContainer iframeWidth={iframeWidth} iframeHeight={iframeHeight}>
        {srcUrl && <StyledIframe src={srcUrl} allow="fullscreen *; autoplay *; camera *; microphone *"></StyledIframe>}
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

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  display: block;
  background-color: white;
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
