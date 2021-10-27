import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';

interface Props {
  worksInfo: WorksInfo;
  hoverId: number;
  setHoverId: (id: number) => void;
}

export const WorksCard: React.VFC<Props> = ({ worksInfo, hoverId, setHoverId }) => {
  return (
    <StyledContainer onMouseEnter={() => setHoverId(worksInfo.id)} isHover={worksInfo.id === hoverId}>
      <StyledThumbnail src={`/static/assets/thumbnails/${worksInfo.thumbnailName}`} height="100%"></StyledThumbnail>
      <p>{worksInfo.title}</p>
    </StyledContainer>
  );
};

interface StyledContainerProps {
  isHover: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 1px solid #2a2a2a;
  padding-top: 1px;
  padding-bottom: 1px;
  background-color: ${({ isHover }) => (isHover ? '#4a4a4a' : '')};
  &:hover {
    cursor: pointer;
  }
`;

const StyledThumbnail = styled.img`
  margin-right: 5px;
`;
