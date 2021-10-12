import React from 'react';
import styled, { css } from 'styled-components';
import { WorksWindow } from './WorksWindow';

export const TestPage: React.VFC = () => {
  const srcUrlInputRef = React.useRef<HTMLInputElement>(null);
  const [srcUrl, setSrcUrl] = React.useState<string>('');
  const setSrcUrlHandler = React.useCallback(() => {
    if (srcUrlInputRef.current === null) {
      return;
    }
    setSrcUrl(srcUrlInputRef.current.value);
  }, []);
  const clearSrcUrlHandler = React.useCallback(() => {
    setSrcUrl('');
    if (srcUrlInputRef.current !== null) {
      srcUrlInputRef.current.value = '';
    }
  }, []);

  return (
    <StyledRoot>
      <StyledContainer>
        <StyledTitle>動作確認ページ</StyledTitle>
        <StyledLabel htmlFor="urlInput">URLを打ち込んで埋め込みの動作を確認</StyledLabel>
        <StyledForm>
          <StyledInput type="text" placeholder="urlを入力" ref={srcUrlInputRef} id="urlInput"></StyledInput>
          <StyledSetButton onClick={setSrcUrlHandler}>動作を確認</StyledSetButton>
          <StyledClearButton onClick={clearSrcUrlHandler}>クリア</StyledClearButton>
        </StyledForm>
        <WorksWindow srcUrl={srcUrl}></WorksWindow>
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

const StyledForm = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  display: block;
  flex: 1;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  padding: 0px 5px;
  margin-right: 10px;
  outline: none;
  border: none;
  border: solid 1px #ccc;
  border-radius: 3px;
`;

const buttonStyle = css`
  padding: 0px 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const StyledSetButton = styled.button`
  ${buttonStyle};
  background-color: red;
  color: white;
  margin-right: 10px;

  &:hover {
    background-color: #850000;
  }
`;

const StyledClearButton = styled.button`
  ${buttonStyle};
  background-color: blue;
  color: white;

  &:hover {
    background-color: #000081;
  }
`;
