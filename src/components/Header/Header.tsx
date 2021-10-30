import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const headerHeight = 48;

interface Props {
  showNavigationToTop?: boolean;
}

export const Header: React.VFC<Props> = ({ showNavigationToTop = false }) => {
  return (
    <StyledContainer>
      <StyledLogo href="https://iiiexhibition.com/">
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
          <StyledLinkToOuterPage href="https://iiiexhibition.com/">
            <p>アンケート</p>
            <StyledUnderBar id="underbar"></StyledUnderBar>
          </StyledLinkToOuterPage>
        </StyledButton>
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
  position: relative;
`;

const StyledLogo = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const StyledNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  margin-left: 130px;
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
