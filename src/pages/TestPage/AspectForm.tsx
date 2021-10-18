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

  React.useEffect(() => {
    if (isAspectWidthValid && isAspectHeightValid) {
      setAspectRatio(aspectHeight / aspectWidth);
    }
  }, [aspectWidth, aspectHeight, isAspectWidthValid, isAspectHeightValid, setAspectRatio]);

  const aspectWidthHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      setIsAspectWidthValid(true);
      setAspectWidth(Number(e.target.value));
    } else {
      setIsAspectWidthValid(false);
    }
  }, []);
  const aspectHeightHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 0) {
      setIsAspectHeightValid(true);
      setAspectHeight(Number(e.target.value));
    } else {
      setIsAspectHeightValid(false);
    }
  }, []);

  return (
    <StyledForm>
      <StyledInputSection>
        <StyledSpan>アスペクト比を調節 → 横：縦 = </StyledSpan>
        <StyledInput type="text" onChange={aspectWidthHandler} defaultValue="16"></StyledInput>
        <StyledSpan> : </StyledSpan>
        <StyledInput type="text" onChange={aspectHeightHandler} defaultValue="9"></StyledInput>
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
