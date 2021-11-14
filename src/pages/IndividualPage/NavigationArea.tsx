import React from 'react';
import styled from 'styled-components';
import { SuggestedWorks } from './SuggestedWorks';
import { Link } from 'react-router-dom';
import { Visited } from 'AppRoot';
import { theme } from 'constants/Theme';

interface Props {
  suggestIds: number[];
  visited: Visited;
  isNarrowLayout: boolean;
}

export const NavigationArea: React.VFC<Props> = ({ suggestIds, visited, isNarrowLayout }) => {
  return (
    <StyledContainer className={isNarrowLayout ? 'narrow' : ''}>
      <StyledButtonContainer>
        <StyledButton>
          <StyledLink to="/">&#8810;　作品一覧へ戻る</StyledLink>
          <StyledUnderBar id="underbar" />
        </StyledButton>
      </StyledButtonContainer>
      <StyledTitle>近くにある作品</StyledTitle>
      <StyledSuggestSection>
        <StyledSuggestWorksContainer className={isNarrowLayout ? 'narrow' : ''}>
          {suggestIds.length >= 4 &&
            suggestIds.slice(0, 4).map((worksId) => {
              return (
                <SuggestedWorks
                  worksId={worksId}
                  isVisited={visited[worksId]}
                  isNarrowLayout={isNarrowLayout}
                  key={worksId}
                />
              );
            })}
        </StyledSuggestWorksContainer>
      </StyledSuggestSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  &.narrow {
    padding: 0px 10px;
  }
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const StyledButton = styled.button`
  display: block;
  background-color: transparent;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
    #underbar {
      width: 100%;
    }
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  font-size: 18px;
  text-decoration: none;
  color: white;
`;

const StyledUnderBar = styled.div`
  width: 0%;
  height: 1px;
  border-top: 1px solid white;
  transition: width 0.2s ease-out;
`;

const StyledTitle = styled.h4`
  color: white;
  margin-bottom: 10px;
  font-weight: ${theme.fontWeight.regular};
`;

const StyledSuggestSection = styled.section`
  width: 100%;
  margin-bottom: 30px;
  color: white;
  overflow-x: auto;
`;

const StyledSuggestWorksContainer = styled.div`
  width: 600px;
  display: flex;
  &.narrow {
    width: 400px;
  }
`;
