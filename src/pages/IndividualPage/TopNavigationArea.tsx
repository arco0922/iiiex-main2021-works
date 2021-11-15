import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  nextRotationOrderWorksId: number;
  isNarrowLayout: boolean;
}

export const TopNavigationArea: React.VFC<Props> = ({ nextRotationOrderWorksId, isNarrowLayout }) => {
  return (
    <StyledContainer className={isNarrowLayout ? '' : 'wide'}>
      <StyledButton>
        <StyledLink to="/" className={isNarrowLayout ? 'narrow' : ''}>
          &#8810; 展示空間TOP
        </StyledLink>
        <StyledUnderBar id="underbar" />
      </StyledButton>
      <StyledButton>
        <StyledLink to={`/works/${nextRotationOrderWorksId}`} className={isNarrowLayout ? 'narrow' : ''}>
          次の作品 &#8811;
        </StyledLink>
        <StyledUnderBar id="underbar" />
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.wide {
    margin-top: 8px;
    margin-bottom: 13px;
  }
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
  padding: 0px 5px;
  font-size: 16px;
  text-decoration: none;
  color: white;
  &.narrow {
    font-size: 14px;
  }
`;

const StyledUnderBar = styled.div`
  width: 0%;
  height: 1px;
  border-top: 1px solid white;
  transition: width 0.2s ease-out;
`;
