import { Header } from 'components/Header/Header';
import { LayoutType } from 'constants/Layout';
import { theme } from 'constants/Theme';
import React from 'react';
import styled from 'styled-components';

interface Props {
  layout: LayoutType;
  setIsShowHamburger: (isShowHamburger: boolean) => void;
}

export const ErrorPage: React.VFC<Props> = ({ layout, setIsShowHamburger }) => {
  const isNarrowLayout = layout !== 'WIDE';

  return (
    <StyledRoot>
      <Header showNavigationToTop={true} layout={layout} setIsShowHamburger={setIsShowHamburger} />
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
  min-width: 100%;
  min-height: 100%;
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
