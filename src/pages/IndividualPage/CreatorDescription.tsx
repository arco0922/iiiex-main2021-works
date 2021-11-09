import styled from 'styled-components';
import { Creator } from 'constants/WorksInfo';
import React from 'react';

interface Props {
  creator: Creator;
}

export const CreatorDescription = React.memo<Props>(function CreatorDescription({ creator }) {
  return (
    <StyledContainer>
      <p>{creator.name}</p>
      <p>{creator.affiliation}</p>
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
  display: block;
  width: 150px;
  height: 150px;
  padding-left: 20px;
  padding-right: 20px;
`;
