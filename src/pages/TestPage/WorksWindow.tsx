import React from 'react';
import styled from 'styled-components';

interface Props {
  srcUrl: string;
}

export const WorksWindow: React.VFC<Props> = ({ srcUrl }) => {
  return (
    <StyledContainer>
      {srcUrl ? <StyledIframe src={srcUrl}></StyledIframe> : <StyledSkeleton></StyledSkeleton>}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 500px;
`;

const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
`;

const StyledSkeleton = styled.div`
  width: 100%;
  height: 500px;
  background-color: #e7e7e7;
`;
