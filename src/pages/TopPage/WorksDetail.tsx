import { Visited } from 'AppRoot';
import { Caption } from 'components/Caption/Caption';
import { theme } from 'constants/Theme';
import { worksInfoArr } from 'constants/WorksInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { sideMenuWidth } from './WorksListMenu';
import { LayoutType } from 'constants/Layout';

interface Props {
  selectId: number;
  visited: Visited;
  isShowDetail: boolean;
  setIsShowDetail: (isShowDetail: boolean) => void;
  layout: LayoutType;
}

export const WorksDetail: React.VFC<Props> = ({ selectId, visited, isShowDetail, setIsShowDetail, layout }) => {
  const info = React.useMemo(() => worksInfoArr.filter((worksInfo) => worksInfo.id === selectId)[0], [selectId]);
  if (!info) {
    return <></>;
  }
  return (
    <StyledContainer className={isShowDetail ? 'show' : ''} isWideLayout={layout === 'WIDE'}>
      <StyledCloseIcon onClick={() => setIsShowDetail(false)}></StyledCloseIcon>
      <StyledTitle>作品詳細</StyledTitle>
      <StyledDetailContainer>
        <StyledImgDiv>
          <StyledThumbnail src={`/static/assets/thumbnails/${info.thumbnailBaseName}.jpg`}></StyledThumbnail>
          {visited[selectId] && <StyledCheck src="/static/assets/check/check_mark.png" height="20%"></StyledCheck>}
        </StyledImgDiv>
        <StyledButton>
          <StyledLink to={`/works/${info.id}`}>作品を見る</StyledLink>
        </StyledButton>
        <StyledDetail>
          <StyledSection>
            <h4>作品名</h4>
            <p>{info.title}</p>
          </StyledSection>
          <StyledSection>
            <h4>制作者</h4>
            <p>{info.creators.map((creator) => creator.name).join(', ')}</p>
          </StyledSection>
          <StyledSection>
            <h4>作品説明</h4>
            <Caption captionText={info.caption}></Caption>
          </StyledSection>
          <StyledSection>
            <h4>近くにある作品</h4>
            <p>作品作品</p>
          </StyledSection>
        </StyledDetail>
      </StyledDetailContainer>
    </StyledContainer>
  );
};

export const sideDetailWidth = 250;

interface StyledContainerProps {
  isWideLayout: boolean;
}

const StyledContainer = styled.div<StyledContainerProps>`
  min-width: ${sideDetailWidth}px;
  width: ${sideDetailWidth}px;
  height: 100%;
  margin-right: ${({ isWideLayout }) => (isWideLayout ? 0 : `${-sideDetailWidth}px`)};
  background-color: #141414dc;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
  opacity: 0;
  transition: all 300ms ease-out;
  &.show {
    opacity: 1;
    margin-right: ${({ isWideLayout }) => (isWideLayout ? `${sideMenuWidth}px` : 0)};
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

const StyledTitle = styled.h2`
  min-height: 24px;
  width: 95%;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid white;
  margin: 5px 5px 3px 5px;
`;

const StyledDetailContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 5px 5px 5px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImgDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const StyledThumbnail = styled.img`
  width: 97%;
  display: block;
`;

const StyledCheck = styled.img`
  position: absolute;
  display: block;
  bottom: 0px;
  right: 0px;
`;

const StyledButton = styled.button`
  background-color: ${theme.color.darkGrey};
  color: white;
  text-decoration: none;
  outline: none;
  border: none;
  border: 2px solid ${theme.color.primary};
  padding: 3px;
  margin-bottom: 15px;
  width: 80%;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.primary};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: ${theme.fontWeight.bold};
`;

const StyledDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const StyledSection = styled.section`
  width: 100%;
  margin-bottom: 15px;
  & > h4 {
    margin-bottom: 3px;
  }
`;
