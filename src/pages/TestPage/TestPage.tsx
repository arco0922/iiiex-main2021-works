import { useWindowDimensions } from 'hooks/useWindowDimensions';
import React from 'react';
import styled from 'styled-components';
import { AspectForm } from './AspectForm';
import { UrlForm } from './UrlForm';
import { WorksWindow } from './WorksWindow';

export const TestPage: React.VFC = () => {
  const [srcUrl, setSrcUrl] = React.useState<string>('');
  const [isFull, setIsFull] = React.useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = React.useState<number>(9 / 16);
  const { height, width } = useWindowDimensions();
  const isNarrowLayout = width < 800;
  const iframeWidth = isFull ? '100vw' : isNarrowLayout ? '100vw' : 'max(60vw , 800px)';
  const iframeHeight = isFull ? '100vh' : `calc( ${iframeWidth} * ${aspectRatio} )`;
  return (
    <StyledRoot>
      <StyledContainer width={iframeWidth}>
        <StyledSettingSection isFull={isFull}>
          <StyledTitle>動作確認ページ</StyledTitle>
          <UrlForm setSrcUrl={setSrcUrl}></UrlForm>
          <AspectForm setAspectRatio={setAspectRatio}></AspectForm>
        </StyledSettingSection>
        <WorksWindow srcUrl={srcUrl} iframeHeight={iframeHeight} isFull={isFull} setIsFull={setIsFull}></WorksWindow>
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
  width: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface StyledSettingSectionProps {
  isFull: boolean;
}

const StyledSettingSection = styled.div<StyledSettingSectionProps>`
  display: ${({ isFull }) => (isFull ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled.h1`
  font-size: 25px;
  margin: 20px 0px 5px 0px;
`;
