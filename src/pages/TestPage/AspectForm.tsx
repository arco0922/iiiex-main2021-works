import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  setAspectRatio: (aspectRatio: number) => void;
}

export const AspectForm: React.VFC<Props> = ({ setAspectRatio }) => {
  const setAspectRatioHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAspectRatio(Number(e.target.value));
  }, []);
  return (
    <StyledForm>
      <StyledLabel>アスペクト比を調節 → 横：縦 = 1 :</StyledLabel>
      <StyledInput
        type="number"
        placeholder="1"
        min="0.1"
        max="2"
        step="0.1"
        onChange={setAspectRatioHandler}
      ></StyledInput>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  margin-top: 5px;
`;

const StyledLabel = styled.label``;

const StyledInput = styled.input`
  width: 3em;
  font-size: 16px;
  outline: none;
  border: none;
  border: solid 1px #ccc;
  border-radius: 3px;
`;
