import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
interface Props {
  nextRotationOrderWorksId: number;
  isNarrowLayout: boolean;
  worksHistory: number[];
  worksHistoryIndex: number | null;
  setWorksHistoryIndex: (id: number | null) => void;
}

export const TopNavigationArea: React.VFC<Props> = ({
  nextRotationOrderWorksId,
  isNarrowLayout,
  worksHistory,
  worksHistoryIndex,
  setWorksHistoryIndex,
}) => {
  const history = useHistory();
  const goBackWorksHistory = React.useCallback(() => {
    if (worksHistoryIndex === null || worksHistoryIndex === 0) {
      return;
    }
    setWorksHistoryIndex(worksHistoryIndex - 1);
    history.push(`/works/${worksHistory[worksHistoryIndex - 1]}`);
  }, [history, worksHistory, worksHistoryIndex, setWorksHistoryIndex]);

  const goForwardWorksHistory = React.useCallback(() => {
    if (worksHistoryIndex === null) {
      return;
    }
    setWorksHistoryIndex(worksHistoryIndex + 1);
    history.push(`/works/${nextRotationOrderWorksId}`);
  }, [history, worksHistoryIndex, setWorksHistoryIndex, nextRotationOrderWorksId]);
  return (
    <StyledContainer className={isNarrowLayout ? '' : 'wide'}>
      <StyledButton>
        {worksHistoryIndex === 0 ? (
          <StyledLink to="/" className={isNarrowLayout ? 'narrow' : ''}>
            &#8810; 展示空間TOP
          </StyledLink>
        ) : (
          <StyledBack onClick={goBackWorksHistory} className={isNarrowLayout ? 'narrow' : ''}>
            &#8810; 前の作品
          </StyledBack>
        )}
        <StyledUnderBar id="underbar" />
      </StyledButton>
      <StyledButton>
        <StyledForward onClick={goForwardWorksHistory} className={isNarrowLayout ? 'narrow' : ''}>
          次の作品 &#8811;
        </StyledForward>
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

const StyledForward = styled.div`
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
