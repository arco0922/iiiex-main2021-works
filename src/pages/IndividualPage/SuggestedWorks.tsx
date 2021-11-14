import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  worksId: number;
  isVisited: boolean;
}

export const SuggestedWorks = React.memo<Props>(function SuggestedWorks({ worksId, isVisited }) {
  if (worksInfoArr.filter(({ id }) => id === worksId).length === 0) {
    return <></>;
  }
  const thumbnailBaseName = worksInfoArr.filter(({ id }) => id === worksId)[0].thumbnailBaseName;
  return (
    <StyledContainer to={`/works/${worksId}`}>
      <StyledThumbnail src={`/static/assets/thumbnails/${thumbnailBaseName}.jpg`}></StyledThumbnail>
      {isVisited && <StyledCheck src="/static/assets/check/check_mark.png" height="20%"></StyledCheck>}
    </StyledContainer>
  );
});

const StyledContainer = styled(Link)`
  display: block;
  width: 120px;
  height: 120px;
  text-decoration: none;
  color: white;
  border-radius: 50%;
  margin: 10px;
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
`;

const StyledCheck = styled.img`
  position: absolute;
  display: block;
  bottom: 0px;
  right: 0px;
`;
