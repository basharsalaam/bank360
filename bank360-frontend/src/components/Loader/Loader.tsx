import React from "react";
import styled from "styled-components";

const Loader = ({ noPadding }: { noPadding?: boolean }) => {
  return (
    <LoaderStyle noPadding={noPadding}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderStyle>
  );
};

export default Loader;

const LoaderStyle = styled.section<{ noPadding?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${(props) => (props.noPadding ? "" : "24px")};
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 56px;
    height: 20px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 3.5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ced9e4;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 24px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 40px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(16px, 0);
    }
  }
`;
