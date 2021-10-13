import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  setSrcUrl: (url: string) => void;
}

export const UrlForm: React.VFC<Props> = ({ setSrcUrl }) => {
  const srcUrlInputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const inputHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);
  const setSrcUrlHandler = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setSrcUrl(inputValue);
    },
    [inputValue, setSrcUrl],
  );
  const clearSrcUrlHandler = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setInputValue('');
      setSrcUrl('');
      if (srcUrlInputRef.current !== null) {
        srcUrlInputRef.current.value = '';
      }
    },
    [setSrcUrl],
  );
  return (
    <StyledForm>
      <StyledLabel htmlFor="urlInput">URLを打ち込んで埋め込みの動作を確認</StyledLabel>
      <StyledInputSection>
        <StyledInput
          type="text"
          placeholder="urlを入力"
          ref={srcUrlInputRef}
          id="urlInput"
          name="url"
          onChange={inputHandler}
        ></StyledInput>
        <StyledSetButton onClick={setSrcUrlHandler}>動作を確認</StyledSetButton>
        <StyledClearButton onClick={clearSrcUrlHandler}>クリア</StyledClearButton>
      </StyledInputSection>
      <StyledDialog>{inputValue ? '' : 'URLが空文字列です'}</StyledDialog>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledInputSection = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
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

const StyledDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  color: red;
`;
