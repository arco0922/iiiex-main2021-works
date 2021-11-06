import { Header } from 'components/Header/Header';
import { theme } from 'constants/Theme';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import React from 'react';
import styled from 'styled-components';

export const ErrorPage: React.VFC = () => {
  const { height, width } = useWindowDimensions();
  const isNarrowLayout = width < 800;

  return (
    <StyledRoot>
      <Header showNavigationToTop={true} />
      <StyledSection>
        <StyledContainer>
          <StyledTitle isNarrowLayout={isNarrowLayout}>ページが見つかりません</StyledTitle>
          <Styled404 isNarrowLayout={isNarrowLayout}>404 Not Found</Styled404>
        </StyledContainer>
      </StyledSection>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.darkGrey};
  min-width: 100vw;
  min-height: 100vh;
  overflow-y: hidden;
`;

const StyledSection = styled.section`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
  color: white;
`;
interface StyledProps {
  isNarrowLayout: boolean;
}

const StyledTitle = styled.h1<StyledProps>`
  font-size: ${({ isNarrowLayout }) => (isNarrowLayout ? '20px' : '30px')};
`;
const Styled404 = styled.h1<StyledProps>`
  font-size: ${({ isNarrowLayout }) => (isNarrowLayout ? '35px' : '50px')};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -50px;
`;
