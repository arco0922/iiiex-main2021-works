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
  if (layout === 'NARROW') {
    return (
      <StyledContainer>
        <StyledLogo href={HOMEPAGE_URL} target="_blank" className="narrow">
          <img src="/static/assets/logo/LOGO.png" height={`${headerHeight - 18}px`} />
        </StyledLogo>
        <StyledNavigationContainer className="narrow">
          <StyledLeftHalf>
            <StyledMenuIcon onClick={() => setIsShowHamburger && setIsShowHamburger(true)}></StyledMenuIcon>
          </StyledLeftHalf>
          <StyledRightHalf>
            {isFull && setIsFull && (
              <StyledButton onClick={() => setIsFull(false)}>
                <StyledExitFullScreen>
                  <p className="narrow">全画面表示終了</p>
                  <StyledUnderBar id="underbar"></StyledUnderBar>
                </StyledExitFullScreen>
              </StyledButton>
            )}
            {!isFull && (
              <StyledQuestionnaireButton>
                <StyledSVG width="128" height="46" viewBox="0 0 128 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0H21.8295H128V46H21.8295H0L21.8295 23L0 0Z"
                    fill="#E94C60"
                  />
                </StyledSVG>
                <StyledLinkToQuestionnaire href={QUESTIONNAIRE_URL} target="_blank">
                  <p className="narrow">全体アンケート</p>
                  <StyledUnderBar id="underbar"></StyledUnderBar>
                </StyledLinkToQuestionnaire>
              </StyledQuestionnaireButton>
            )}
          </StyledRightHalf>
        </StyledNavigationContainer>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <StyledHamburgerContainer>
        <StyledMenuIcon onClick={() => setIsShowHamburger && setIsShowHamburger(true)}></StyledMenuIcon>
      </StyledHamburgerContainer>
      <StyledLogo href={HOMEPAGE_URL} target="_blank">
        <img src="/static/assets/logo/LOGO.png" height={`${headerHeight - 18}px`} />
      </StyledLogo>
      <StyledNavigationContainer>
        {showNavigationToTop && (
          <StyledButton>
            <StyledLinkToTop to="/">
              <p>展示空間TOP</p>
              <StyledUnderBar id="underbar"></StyledUnderBar>
            </StyledLinkToTop>
          </StyledButton>
        )}
        {isFull && setIsFull && (
          <StyledButton onClick={() => setIsFull(false)}>
            <StyledExitFullScreen>
              <p>全画面表示終了</p>
              <StyledUnderBar id="underbar"></StyledUnderBar>
            </StyledExitFullScreen>
          </StyledButton>
        )}
        <StyledQuestionnaireButton className={layout === 'MID' ? 'mid' : 'wide'}>
          <StyledSVG width="158" height="65" viewBox="0 0 158 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M158 0H0V48V65L79 48L158 65V48V0Z" fill="#E94C60" />
          </StyledSVG>
          <StyledLinkToQuestionnaire className="wide" href={QUESTIONNAIRE_URL} target="_blank">
            <p>全体アンケート</p>
            <StyledUnderBar id="underbar"></StyledUnderBar>
          </StyledLinkToQuestionnaire>
        </StyledQuestionnaireButton>
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
  z-index: 5;
  position: absolute;
  left: 50px;
  top: 0px;

  &.narrow {
    padding: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StyledSVG = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  margin-left: 140px;
  &.narrow {
    margin-left: 15px;
    padding-right: 0px;
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

const StyledQuestionnaireButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  height: 50px;
  width: 110px;
  display: flex;
  flex-direction: column;
  z-index: 18;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 0px;
  &.mid {
    height: 54px;
    width: 130px;
    right: 0px;
    top: 0px;
  }
  &.wide {
    height: 54px;
    width: 130px;
    right: 120px;
    top: 0px;
  }
  &:hover {
    cursor: pointer;
    #underbar {
      width: 80%;
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

const StyledLinkToQuestionnaire = styled.a`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  &.wide {
    top: 43%;
    left: 50%;
  }
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

const StyledHamburgerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  color: white;
  margin-left: 15px;
`;
