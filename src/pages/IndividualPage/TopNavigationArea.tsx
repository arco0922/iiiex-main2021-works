import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
interface Props {
  nextRotationOrderWorksId: number;
  isNarrowLayout: boolean;
  worksHistory: number[];
  setWorksHistory: (worksHistory: number[]) => void;
}

export const TopNavigationArea: React.VFC<Props> = ({
  nextRotationOrderWorksId,
  isNarrowLayout,
  worksHistory,
  setWorksHistory,
}) => {
  const history = useHistory();
  const popWorksHistory = React.useCallback(() => {
    worksHistory.pop();
    setWorksHistory(worksHistory);
    history.push(`/works/${worksHistory.slice(-1)[0]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWorksHistory]);
  return (
    <StyledContainer className={isNarrowLayout ? '' : 'wide'}>
      <StyledButton>
        {worksHistory.length == 1 ? (
          <StyledLink to="/" className={isNarrowLayout ? 'narrow' : ''}>
            &#8810; 展示空間TOP
          </StyledLink>
        ) : (
          <StyledBack onClick={popWorksHistory} className={isNarrowLayout ? 'narrow' : ''}>
            &#8810; 前の作品
          </StyledBack>
        )}
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
  min-height: 21px;
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

const StyledBack = styled.div`
  display: block;
  padding: 0px 5px;
  font-size: 16px;
  text-decoration: none;
  color: white;
  &.narrow {
    font-size: 14px;
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
