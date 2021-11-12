import React from 'react';
import styled from 'styled-components';
import { SuggestedWorks } from './SuggestedWorks';
import { theme } from 'constants/Theme';
import { Link } from 'react-router-dom';
import { Visited } from 'AppRoot';

interface Props {
  isFull: boolean;
  suggestIds: number[];
  visited: Visited;
}

export const NavigationArea: React.VFC<Props> = ({ isFull, suggestIds, visited }) => {
  return (
    <StyledContainer>
      <StyledButtonContainer isFull={false}>
        <StyledButton>
          <StyledLink to="/">&#8810;　作品一覧へ戻る</StyledLink>
          <StyledUnderBar id="underbar"></StyledUnderBar>
        </StyledButton>
      </StyledButtonContainer>
      <StyledSection>
        <h4>近くにある作品</h4>
        <StyledSuggestWorksContainer>
          {suggestIds.length >= 4 &&
            suggestIds.slice(0, 4).map((worksId) => {
              return <SuggestedWorks worksId={worksId} isVisited={visited[worksId]} key={worksId}></SuggestedWorks>;
            })}
        </StyledSuggestWorksContainer>
      </StyledSection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

interface StyledNavigationAreaProps {
  isFull: boolean;
}

const StyledButtonContainer = styled.div<StyledNavigationAreaProps>`
  width: 100%;
  margin-top: 40px;
  display: ${({ isFull }) => (isFull ? 'none' : 'flex')};
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

const StyledUnderBar = styled.div`
  width: 0%;
  height: 1px;
  border-top: 1px solid white;
  transition: width 0.2s ease-out;
`;
const StyledSuggestWorksContainer = styled.div`
  width: 100%;
  display: flex;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  font-size: 18px;
  text-decoration: none;
  color: white;
`;

const StyledSection = styled.section`
  width: 100%;
  margin-bottom: 30px;
  color: white;
`;
