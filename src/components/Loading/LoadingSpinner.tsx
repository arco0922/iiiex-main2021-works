import React from 'react';
import styled, { keyframes } from 'styled-components';

export const LoadingSpinner = React.memo(function Loading() {
  return (
    <StyledContainer>
      <StyledSpinner></StyledSpinner>
      <StyledLoadingText>Loading...</StyledLoadingText>
    </StyledContainer>
  );
});

const RotateLoading = keyframes`
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
`;

const TextOpacity = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  height: 80px;
  position: relative;
  width: 80px;
  border-radius: 100%;
`;

const StyledSpinner = styled.div`
  height: 80px;
  position: relative;
  width: 80px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent #fff transparent #fff;
  -moz-animation: ${RotateLoading} 1.5s linear 0s infinite normal;
  -moz-transform-origin: 50% 50%;
  -o-animation: ${RotateLoading} 1.5s linear 0s infinite normal;
  -o-transform-origin: 50% 50%;
  -webkit-animation: ${RotateLoading} 1.5s linear 0s infinite normal;
  -webkit-transform-origin: 50% 50%;
  animation: ${RotateLoading} 1.5s linear 0s infinite normal;
  transform-origin: 50% 50%;
`;

const StyledLoadingText = styled.div`
  -moz-animation: ${TextOpacity} 1.5s linear 0s infinite normal;
  -o-animation: ${TextOpacity} 1.5s linear 0s infinite normal;
  -webkit-animation: ${TextOpacity} 1.5s linear 0s infinite normal;
  animation: ${TextOpacity} 1.5s linear 0s infinite normal;
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
