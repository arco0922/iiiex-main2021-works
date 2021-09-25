import React from 'react';
import img from 'assets/images/sample.png';
import './index.scss';
import styled from 'styled-components';

export const AppRoot: React.VFC = () => {
  return (
    <StyledDiv>
      <p>Hello</p>
      <img src={img}></img>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: red;
`;
