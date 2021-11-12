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
      <p>
        {' '}
        <br /> {creator.affiliation}
      </p>
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
  display: block;
  width: 200px;
  height: 150px;
  margin-right: 20px;
`;
