import React from 'react';
import styled from 'styled-components';
import { AspectForm } from './AspectForm';
import { UrlForm } from './UrlForm';
import { WorksWindow } from './WorksWindow';

export const TestPage: React.VFC = () => {
  const [srcUrl, setSrcUrl] = React.useState<string>('');
  const [isFull, setIsFull] = React.useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = React.useState<number>(1 / 1);
  const iframeWidth = isFull ? '100vw' : '600px';
  const iframeHeight = isFull ? '100vh' : 500 * aspectRatio + 'px';
  return (
    <StyledRoot>
      <StyledContainer width={iframeWidth}>
        {isFull ? (
          <></>
        ) : (
          <>
            <StyledTitle>動作確認ページ</StyledTitle>
            <UrlForm setSrcUrl={setSrcUrl}></UrlForm>
          </>
        )}
        <WorksWindow srcUrl={srcUrl} iframeHeight={iframeHeight} isFull={isFull} setIsFull={setIsFull}></WorksWindow>
        <AspectForm setAspectRatio={setAspectRatio}></AspectForm>
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

const StyledTitle = styled.h1`
  font-size: 25px;
  margin: 20px 0px 5px 0px;
`;
