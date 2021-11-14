import styled from 'styled-components';
import { Creator } from 'constants/WorksInfo';
import React from 'react';

interface Props {
  creator: Creator;
}

export const CreatorDescription = React.memo<Props>(function CreatorDescription({ creator }) {
  return (
    <StyledContainer>
      <h4>{creator.name}</h4>
      <p>{creator.affiliation}</p>
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
  display: block;
  width: 160px;
  height: 100px;
  margin-right: 20px;
  & > h4 {
    margin-bottom: 5px;
  }
  & > p {
    font-size: 13px;
    white-space: pre-line;
  }
  &:last-of-type {
    margin-right: 0px;
  }
`;
