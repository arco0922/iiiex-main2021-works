import { Visited } from 'AppRoot';
import React from 'react';
import { HamburgerWorksCard } from './HamburgerWorksCard';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { worksInfoArr } from 'constants/WorksInfo';
import { Link } from 'react-router-dom';
import { HOMEPAGE_URL, QUESTIONNAIRE_URL } from 'constants/OutUrls';
import { isSmoothScrollable, useFixScroll } from 'hooks/useFixScroll';
import { isOpen } from 'constants/BasicInfo';

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
  const scrollContaierRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useFixScroll(scrollContaierRef, scrollerRef);

  return (
    <StyledContainer className={isShowHamburger ? 'show' : ''}>
      <StyledCloseIcon onClick={() => setIsShowHamburger(false)}></StyledCloseIcon>
      <StyledNavSection>
        <StyledTitle>MENU</StyledTitle>
        <StyledButton>
          <StyledLink to="/" onClick={() => setIsShowHamburger(false)}>
            展示空間TOP
          </StyledLink>
        </StyledButton>
        <StyledButton>
          <StyledOutLink href={HOMEPAGE_URL} target="_blank" onClick={() => setIsShowHamburger(false)}>
            制作展ホームページ
          </StyledOutLink>
        </StyledButton>
        {isOpen && (
          <StyledButton>
            <StyledOutLink href={QUESTIONNAIRE_URL} target="_blank" onClick={() => setIsShowHamburger(false)}>
              全体アンケート
            </StyledOutLink>
          </StyledButton>
        )}
      </StyledNavSection>
      <StyledWorksSection>
        <StyledTitle>作品一覧</StyledTitle>
        <ScrollContainer ref={scrollContaierRef}>
          <Scroller ref={scrollerRef}>
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
          </Scroller>
        </ScrollContainer>
      </StyledWorksSection>
    </StyledContainer>
  );
});

const StyledContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 250px;

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
  top: 5px;
  right: 5px;
  z-index: 23;
  &:hover {
    cursor: pointer;
  }
`;

const StyledNavSection = styled.section`
  display: flex;
  min-height: ${isOpen ? '170px' : '130px'};
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledWorksSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  overflow-y: auto;
`;

const StyledButton = styled.div`
  display: block;
  outline: none;
  border: none;
  background-color: black;
  border-bottom: 1px solid #aaaaaa;
`;

const StyledLink = styled(Link)`
  padding: 20px 5px 5px 5px;
  font-size: 13px;
  text-decoration: none;
  color: white;
  display: block;
`;

const StyledOutLink = styled.a`
  padding: 20px 5px 5px 5px;
  font-size: 13px;
  text-decoration: none;
  color: white;
  display: block;
`;

const StyledTitle = styled.h2`
  min-height: 24px;
  width: 95%;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid white;
  margin: 8px 5px 3px 5px;
`;

const ScrollContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

const Scroller = styled.div`
  min-height: ${isSmoothScrollable ? 'calc(100% + 1px)' : '100%'};
`;

const StyledCardsContainer = styled.div`
  padding: 10px;
`;
