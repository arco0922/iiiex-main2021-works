import React from 'react';
import styled from 'styled-components';
import { SuggestedWorks } from './SuggestedWorks';
import { Link } from 'react-router-dom';
import { Visited } from 'AppRoot';
import { theme } from 'constants/Theme';

interface Props {
  nextRotationOrderWorksId: number;
  suggestIds: number[];
  visited: Visited;
  isNarrowLayout: boolean;
}

export const NavigationArea: React.VFC<Props> = ({ suggestIds, visited, isNarrowLayout, nextRotationOrderWorksId }) => {
  return (
    <StyledContainer>
      {isNarrowLayout ? (
        <StyledNarrowButtonContainer>
          <StyledNarrowButton>
            <StyledNarrowLink to="/">展示空間TOPへ戻る</StyledNarrowLink>
          </StyledNarrowButton>
        </StyledNarrowButtonContainer>
      ) : (
        <StyledButtonContainer>
          <StyledButton>
            <StyledLink to="/">&#8810;　展示空間TOPへ戻る</StyledLink>
            <StyledUnderBar id="underbar" />
          </StyledButton>
        </StyledButtonContainer>
      )}
      <StyledSuggestRoot>
        <StyledNextSuggestContainer>
          <StyledNextTitle className={isNarrowLayout ? 'narrow' : ''}>次のおすすめ</StyledNextTitle>
          <StyledSuggestSection>
            <SuggestedWorks
              worksId={nextRotationOrderWorksId}
              isVisited={visited[nextRotationOrderWorksId]}
              isNarrowLayout={isNarrowLayout}
              key={nextRotationOrderWorksId}
            />{' '}
          </StyledSuggestSection>
        </StyledNextSuggestContainer>
        <StyledSuggestContainer>
          <StyledTitle className={isNarrowLayout ? 'narrow' : ''}>近くにある作品を見る</StyledTitle>
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
        </StyledSuggestContainer>
      </StyledSuggestRoot>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledNarrowButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px 30px 0px;
  padding: 0px 10px;
`;

const StyledNarrowButton = styled.button`
  display: block;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  border: 2px solid white;
  & * {
    color: white;
  }
  &:hover {
    cursor: pointer;
    background-color: white;
    & * {
      color: black;
    }
  }
`;

const StyledNarrowLink = styled(Link)`
  display: block;
  padding: 10px;
  font-size: 18px;
  text-decoration: none;
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

const StyledSuggestRoot = styled.div`
  display: flex;
`;

const StyledNextSuggestContainer = styled.div`
  padding-right: 10px;
  border-right: solid;
  border-color: #474747;
  border-width: 1px;
`;

const StyledNextTitle = styled.h4`
  color: white;
  text-align: center;
  margin-bottom: 10px;
  min-width: 100px;
  font-weight: ${theme.fontWeight.regular};
`;

const StyledSuggestContainer = styled.div`
  overflow-x: auto;
`;

const StyledTitle = styled.h4`
  color: white;
  margin-bottom: 10px;
  min-width: 160px;
  font-weight: ${theme.fontWeight.regular};
  margin-left: 10px;
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
