import React from 'react';
import styled from 'styled-components';

interface Props {
  srcUrl: string;
}

export const WorksWindow: React.VFC<Props> = ({ srcUrl }) => {
  return <>{srcUrl ? <StyledIframe src={srcUrl}></StyledIframe> : <p>URLが空文字列です</p>}</>;
};

const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 500px;
  outline: none;
  border: none;
`;
