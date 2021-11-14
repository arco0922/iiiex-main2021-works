import React from 'react';
import styled from 'styled-components';
import { SuggestedWorks } from './SuggestedWorks';
import { Link } from 'react-router-dom';
import { Visited } from 'AppRoot';
import { theme } from 'constants/Theme';

interface Props {
  isFull: boolean;
  suggestIds: number[];
  visited: Visited;
}

export const NavigationArea: React.VFC<Props> = ({ isFull, suggestIds, visited }) => {
  return (
    <StyledContainer>
      <StyledButtonContainer>
        <StyledButton>
          <StyledLink to="/">&#8810;　作品一覧へ戻る</StyledLink>
          <StyledUnderBar id="underbar" />
        </StyledButton>
      </StyledButtonContainer>
      <StyledTitle>近くにある作品</StyledTitle>
      <StyledSuggestSection>
        <StyledSuggestWorksContainer>
          {suggestIds.length >= 4 &&
            suggestIds.slice(0, 4).map((worksId) => {
              return <SuggestedWorks worksId={worksId} isVisited={visited[worksId]} key={worksId} />;
            })}
        </StyledSuggestWorksContainer>
      </StyledSuggestSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
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
`;
