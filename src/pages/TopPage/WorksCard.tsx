import { WorksInfo } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';

interface Props {
  worksInfo: WorksInfo;
}

export const WorksCard: React.VFC<Props> = ({ worksInfo }) => {
  return (
    <StyledContainer>
      <StyledThumbnail src={`/static/assets/thumbnails/${worksInfo.thumbnailName}`} height="100%"></StyledThumbnail>
      <p>{worksInfo.title}</p>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 1px solid #2a2a2a;
  padding-top: 1px;
  padding-bottom: 1px;
  &:hover {
    cursor: pointer;
    background-color: #4a4a4a;
  }
`;

const StyledThumbnail = styled.img`
  margin-right: 5px;
`;
