import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';
import { WorksCard } from './WorksCard';

interface Props {
  hoverId: number;
  setHoverId: (id: number) => void;
}

export const WorksListMenu: React.VFC<Props> = ({ hoverId, setHoverId }) => {
  return (
    <StyledContainer>
      <StyledTitle>作品一覧</StyledTitle>
      <StyledCardsContainer>
        {worksInfoArr.map((worksInfo) => {
          return (
            <WorksCard worksInfo={worksInfo} key={worksInfo.id} hoverId={hoverId} setHoverId={setHoverId}></WorksCard>
          );
        })}
      </StyledCardsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 300px;
  width: 300px;
  height: 100%;
  padding: 4px;
  background-color: #141414;
  color: white;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  min-height: 24px;
  width: 95%;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid white;
  margin-bottom: 3px;
`;

const StyledCardsContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
`;
