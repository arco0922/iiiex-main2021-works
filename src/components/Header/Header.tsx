import { LayoutType } from 'constants/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { HOMEPAGE_URL, QUESTIONNAIRE_URL } from 'constants/OutUrls';

export const headerHeight = 48;

interface Props {
  showNavigationToTop?: boolean;
  isFull?: boolean;
  setIsFull?: (isFull: boolean) => void;
  layout: LayoutType;
  setIsShowHamburger?: (isShowHamburger: boolean) => void;
}

export const Header: React.VFC<Props> = ({
  showNavigationToTop = false,
  isFull = false,
  setIsFull,
  layout,
  setIsShowHamburger,
}) => {
  const isNarrowLayout = layout === 'MID' || layout === 'NARROW';
  if (isNarrowLayout) {
    return (
      <StyledContainer>
        <StyledLogo href={HOMEPAGE_URL} className="narrow">
          <img src="/static/assets/logo/LOGO.png" height={`${headerHeight - 18}px`} />
        </StyledLogo>
        <StyledNavigationContainer className="narrow">
          <StyledLeftHalf>
            <StyledMenuIcon onClick={() => setIsShowHamburger && setIsShowHamburger(true)}></StyledMenuIcon>
          </StyledLeftHalf>
          <StyledRightHalf>
            {(layout === 'MID' || !isFull) && (
              <StyledButton>
                <StyledLinkToOuterPage href={QUESTIONNAIRE_URL}>
                  <p className="narrow">全体アンケート</p>
                  <StyledUnderBar id="underbar"></StyledUnderBar>
                </StyledLinkToOuterPage>
              </StyledButton>
            )}
            {isFull && setIsFull && (
              <StyledButton onClick={() => setIsFull(false)}>
                <StyledExitFullScreen>
                  <p className="narrow">全画面表示終了</p>
                  <StyledUnderBar id="underbar"></StyledUnderBar>
                </StyledExitFullScreen>
              </StyledButton>
            )}
          </StyledRightHalf>
        </StyledNavigationContainer>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <StyledLogo href={HOMEPAGE_URL}>
        <img src="/static/assets/logo/LOGO.png" height={`${headerHeight - 18}px`} />
      </StyledLogo>
      <StyledNavigationContainer>
        {showNavigationToTop && (
          <StyledButton>
            <StyledLinkToTop to="/">
              <p>作品一覧</p>
              <StyledUnderBar id="underbar"></StyledUnderBar>
            </StyledLinkToTop>
          </StyledButton>
        )}
        <StyledButton>
          <StyledLinkToOuterPage href={QUESTIONNAIRE_URL}>
            <p>全体アンケート</p>
            <StyledUnderBar id="underbar"></StyledUnderBar>
          </StyledLinkToOuterPage>
        </StyledButton>
        {isFull && setIsFull && (
          <StyledButton onClick={() => setIsFull(false)}>
            <StyledExitFullScreen>
              <p>全画面表示終了</p>
              <StyledUnderBar id="underbar"></StyledUnderBar>
            </StyledExitFullScreen>
          </StyledButton>
        )}
      </StyledNavigationContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: ${headerHeight}px;
  min-height: ${headerHeight}px;
  width: 100%;
  background-color: #000000;
  display: flex;
  align-items: center;
`;

const StyledMenuIcon = styled(MenuIcon)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledLogo = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 5;

  &.narrow {
    padding: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StyledNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  margin-left: 130px;

  &.narrow {
    margin-left: 15px;
    margin-right: 10px;
    justify-content: space-between;
  }
`;

const StyledLeftHalf = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  color: white;
`;

const StyledRightHalf = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const StyledButton = styled.button`
  background-color: black;
  outline: none;
  border: none;
  padding: 3px 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: #474747;
    #underbar {
      width: 100%;
    }
  }
  & p.narrow {
    font-size: 11px;
  }
`;

const StyledUnderBar = styled.div`
  width: 0%;
  height: 1px;
  border-top: 1px solid white;
  transition: width 0.2s ease-out;
`;

const StyledLinkToOuterPage = styled.a`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: white;
`;

const StyledLinkToTop = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: white;
`;

const StyledExitFullScreen = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: white;
`;
