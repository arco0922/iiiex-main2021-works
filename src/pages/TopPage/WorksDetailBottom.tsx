import { Visited } from 'AppRoot';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  selectId: number;
  visited: Visited;
  isShowDetail: boolean;
  setIsShowDetail: (isShowDetail: boolean) => void;
}

export const WorksDetailBottom: React.VFC<Props> = ({ selectId, visited, isShowDetail, setIsShowDetail }) => {
  const info = React.useMemo(() => worksInfoArr.filter((worksInfo) => worksInfo.id === selectId)[0], [selectId]);
  if (!info) {
    return <></>;
  }
  return (
    <StyledContainer className={isShowDetail ? 'show' : ''}>
      <StyledCloseIcon onClick={() => setIsShowDetail(false)}></StyledCloseIcon>
      <StyledDetailContainer>
        <StyledImgDiv>
          <StyledThumbnail src={`/static/assets/thumbnails/${info.thumbnailBaseName}.jpg`}></StyledThumbnail>
          {visited[selectId] && <StyledCheck src="/static/assets/check/check_mark.png" height="20%"></StyledCheck>}
        </StyledImgDiv>
        <StyledDetail>
          <StyledSection>{info.title}</StyledSection>
          <StyledButton>
            <StyledLink to={`/works/${info.id}`}>
              作品を見る
              <ArrowForwardIosIcon />
            </StyledLink>
          </StyledButton>
        </StyledDetail>
      </StyledDetailContainer>
    </StyledContainer>
  );
};

export const bottomDetailHeight = 150;

const StyledContainer = styled.div`
  width: 100%;
  height: ${bottomDetailHeight}px;
  overflow-y: auto;
  background-color: #141414dc;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: absolute;
  opacity: 0;
  transition: all 300ms ease-out;
  bottom: ${-bottomDetailHeight}px;
  left: 0;
  &.show {
    opacity: 1;
    bottom: 0;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 3px;
  right: 5px;
  z-index: 3;
  &:hover {
    cursor: pointer;
  }
`;

const StyledDetailContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledImgDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const StyledThumbnail = styled.img`
  height: 100%;
  display: block;
`;

const StyledCheck = styled.img`
  position: absolute;
  display: block;
  bottom: 0px;
  right: 0px;
`;

const StyledDetail = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledSection = styled.section`
  width: calc(100% - 15px);
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
  background-color: ${theme.color.darkGrey};
  color: white;
  text-decoration: none;
  outline: none;
  border: none;
  border: 2px solid ${theme.color.primary};
  width: 100%;
  flex: 1;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.primary};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: ${theme.fontWeight.bold};
`;
