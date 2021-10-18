import React from 'react';
import styled from 'styled-components';

interface Props {
  setAspectRatio: (aspectRatio: number) => void;
}

export const AspectForm: React.VFC<Props> = ({ setAspectRatio }) => {
  const [aspectWidth, setAspectWidth] = React.useState<number>(16);
  const [aspectHeight, setAspectHeight] = React.useState<number>(9);
  const [isAspectWidthValid, setIsAspectWidthValid] = React.useState<boolean>(true);
  const [isAspectHeightValid, setIsAspectHeightValid] = React.useState<boolean>(true);
  const aspectWidthHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAspectWidth(Number(e.target.value));
    Number(e.target.value) > 0 ? setIsAspectWidthValid(true) : setIsAspectWidthValid(false);
  }, []);
  const aspectHeightHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAspectHeight(Number(e.target.value));
    Number(e.target.value) > 0 ? setIsAspectHeightValid(true) : setIsAspectHeightValid(false);
  }, []);

  const setAspectRatioHandler = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      isAspectWidthValid && isAspectHeightValid ? setAspectRatio(aspectHeight / aspectWidth) : console.log('Error');
    },
    [aspectHeight, aspectWidth, isAspectHeightValid, isAspectWidthValid, setAspectRatio],
  );
  return (
    <StyledForm>
      <StyledInputSection>
        <StyledSpan>アスペクト比を調節 → 横：縦 = </StyledSpan>
        <StyledInput type="text" onChange={aspectWidthHandler} defaultValue="16"></StyledInput>
        <StyledSpan> : </StyledSpan>
        <StyledInput type="text" onChange={aspectHeightHandler} defaultValue="9"></StyledInput>
        <StyledButton onClick={setAspectRatioHandler}>確定</StyledButton>
      </StyledInputSection>
      <StyledDialog isShow={!(isAspectWidthValid && isAspectHeightValid)}>正の数値を入力して下さい</StyledDialog>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;

const StyledInputSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 8px;
`;

const StyledSpan = styled.span`
  margin-right: 10px;
`;

const StyledInput = styled.input`
  width: 3em;
  font-size: 16px;
  outline: none;
  border: none;
  border: solid 1px #ccc;
  border-radius: 3px;
  margin-right: 10px;
  padding: 0 3px;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 0px 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  background-color: #303030;
  color: white;
  &:hover {
    background-color: #000000;
    cursor: pointer;
  }
`;

interface StyledDialogProps {
  isShow: boolean;
}

const StyledDialog = styled.div<StyledDialogProps>`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  color: red;
`;
