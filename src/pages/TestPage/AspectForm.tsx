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
    <form>
      <label>アスペクト比を調節 → 横：縦 = 1 : </label>
      <input type="number" placeholder="1" min="0.1" max="2" step="0.1" onChange={setAspectRatioHandler}></input>
    </form>
  );
};
