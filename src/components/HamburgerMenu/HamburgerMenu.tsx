import { Visited } from 'AppRoot';
import React from 'react';
import { HamburgerWorksCard } from './HamburgerWorksCard';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { worksInfoArr } from 'constants/WorksInfo';

interface Props {
  isShowHamburger: boolean;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
  visited: Visited;
}

export const HamburgerMenu = React.memo<Props>(function HamburgerMenu({
  isShowHamburger,
  setIsShowHamburger,
  visited,
}) {
  return (
    <StyledContainer className={isShowHamburger ? 'show' : ''}>
      <StyledCloseIcon onClick={() => setIsShowHamburger(false)}></StyledCloseIcon>
      <StyledTitle>作品一覧</StyledTitle>
      <StyledCardsContainer>
        {worksInfoArr.map((worksInfo) => {
          return (
            <HamburgerWorksCard
              worksInfo={worksInfo}
              key={worksInfo.id}
              visited={visited}
              setIsShowHamburger={setIsShowHamburger}
            ></HamburgerWorksCard>
          );
        })}
      </StyledCardsContainer>
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: black;
  color: white;

  opacity: 0;
  transition: all 300ms ease-out;

  right: 100%;
  top: 0px;
  z-index: 20;

  &.show {
    opacity: 1;
    transform: translateX(100%);
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 3px;
  right: 5px;
  z-index: 23;
  &:hover {
    cursor: pointer;
  }
`;

const StyledTitle = styled.h2`
  min-height: 24px;
  width: 95%;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid white;
  margin: 5px 5px 3px 5px;
`;

const StyledCardsContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;
