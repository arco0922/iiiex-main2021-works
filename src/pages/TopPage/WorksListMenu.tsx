import { Visited } from 'AppRoot';
import { isSmoothScrollable, useFixScroll } from 'hooks/useFixScroll';
import React from 'react';
import styled from 'styled-components';
import { rotationSortedWorksInfoArr } from 'utils/calcRotationUtils';
import { WorksCard } from './WorksCard';

interface Props {
  selectId: number;
  setSelectId: (id: number) => void;
  visited: Visited;
  setIsShowDetail: (isShowDetail: boolean) => void;
}

export const WorksListMenu: React.VFC<Props> = ({ selectId, setSelectId, visited, setIsShowDetail }) => {
  const scrollContaierRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  useFixScroll(scrollContaierRef, scrollerRef);

  return (
    <StyledContainer>
      <StyledTitle>作品一覧</StyledTitle>
      <ScrollContainer ref={scrollContaierRef}>
        <Scroller ref={scrollerRef}>
          <StyledCardsContainer>
            {rotationSortedWorksInfoArr.map((worksInfo) => {
              return (
                <WorksCard
                  worksInfo={worksInfo}
                  key={worksInfo.id}
                  selectId={selectId}
                  setSelectId={setSelectId}
                  visited={visited}
                  setIsShowDetail={setIsShowDetail}
                  scrollContainerRef={scrollContaierRef}
                ></WorksCard>
              );
            })}
          </StyledCardsContainer>
        </Scroller>
      </ScrollContainer>
    </StyledContainer>
  );
};

export const sideMenuWidth = 250;

const StyledContainer = styled.div`
  min-width: ${sideMenuWidth}px;
  width: ${sideMenuWidth}px;
  height: 100%;
  padding: 10px 0px 4px 4px;
  background-color: #141414;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 4;
  position: absolute;
  right: 0px;
  top: 0px;
`;

const StyledTitle = styled.h2`
  min-height: 26px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid white;
  margin-bottom: 3px;
`;

const ScrollContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

const Scroller = styled.div`
  min-height: ${isSmoothScrollable ? 'calc(100% + 1px)' : '100%'};
`;

const StyledCardsContainer = styled.div``;
