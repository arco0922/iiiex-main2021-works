import { Visited } from 'AppRoot';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import styled from 'styled-components';
import { WorksCard } from './WorksCard';

interface Props {
  selectId: number;
  setSelectId: (id: number) => void;
  visited: Visited;
  setIsShowDetail: (isShowDetail: boolean) => void;
}

export const WorksListMenu: React.VFC<Props> = ({ selectId, setSelectId, visited, setIsShowDetail }) => {
  return (
    <StyledContainer>
      <StyledTitle>作品一覧</StyledTitle>
      <StyledCardsContainer>
        {worksInfoArr.map((worksInfo) => {
          return (
            <WorksCard
              worksInfo={worksInfo}
              key={worksInfo.id}
              selectId={selectId}
              setSelectId={setSelectId}
              visited={visited}
              setIsShowDetail={setIsShowDetail}
            ></WorksCard>
          );
        })}
      </StyledCardsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 250px;
  width: 250px;
  height: 100%;
  padding: 4px 0px 4px 4px;
  background-color: #141414;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 4;
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
  overflow-y: auto;
`;
