import React from 'react';
import styled from 'styled-components';
import { UrlForm } from './UrlForm';
import { WorksWindow } from './WorksWindow';

export const TestPage: React.VFC = () => {
  const [srcUrl, setSrcUrl] = React.useState<string>('');
  const [isFull, setFull] = React.useState<boolean>(false);
  return (
    <StyledRoot>
      <StyledContainer>
        {isFull ? (
          <></>
        ) : (
          <>
            <StyledTitle>動作確認ページ</StyledTitle>
            <UrlForm setSrcUrl={setSrcUrl}></UrlForm>
          </>
        )}
        <WorksWindow srcUrl={srcUrl} isFull={isFull} setFull={setFull}></WorksWindow>
      </StyledContainer>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h1`
  font-size: 25px;
  margin: 20px 0px 5px 0px;
`;
