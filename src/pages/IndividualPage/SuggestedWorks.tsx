import { worksInfoArr } from 'constants/WorksInfo';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'constants/Theme';

interface Props {
  worksId: number;
  isVisited: boolean;
  isNarrowLayout: boolean;
}

export const SuggestedWorks = React.memo<Props>(function SuggestedWorks({ worksId, isVisited, isNarrowLayout }) {
  const [isHover, setIsHover] = React.useState<boolean>(false);
  if (worksInfoArr.filter(({ id }) => id === worksId).length === 0) {
    return <></>;
  }
  const thumbnailBaseName = worksInfoArr.filter(({ id }) => id === worksId)[0].thumbnailBaseName;
  return (
    <StyledContainer
      to={`/works/${worksId}`}
      className={isNarrowLayout ? 'narrow' : ''}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <StyledHoverDiv>
          <p>作品を見る</p>
        </StyledHoverDiv>
      )}
      <StyledThumbnailContainer>
        <StyledThumbnail
          src={`/static/assets/thumbnails/${thumbnailBaseName}.jpg`}
          className="thumbnail"
        ></StyledThumbnail>
      </StyledThumbnailContainer>
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
  &.narrow {
    width: 90px;
    height: 90px;
    margin: 5px;
  }
  &:hover .thumbnail {
    transform: scale(1.1, 1.1);
  }
`;

const StyledHoverDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  border-radius: 50%;
  ///border: 3px solid ${theme.color.primary};
  & > p {
    font-weight: ${theme.fontWeight.bold};
    font-size: 16px;
  }
`;

const StyledThumbnailContainer = styled.div`
  display: block;
  overflow: hidden;
  border-radius: 50%;
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
`;

const StyledCheck = styled.img`
  position: absolute;
  display: block;
  bottom: 0px;
  right: 0px;
`;
