import styled from "styled-components";
import arrowDown from "./../../assets/icons/arrow-down.svg";
import arrowUp from "./../../assets/icons/arrow-top.svg";

const Wrapper = styled.section`
  background-color: var(--white);

  .accordion {
    /* The entire container */
  }
  .accordion__item + .accordion__item {
    /* Each item */
  }
  .accordion__button {
    cursor: pointer;
    padding: 20px 0px;
    padding-right: 2em;
    /* width: 100%; */
    text-align: left;
    border: none;
    display: flex;
    min-height: 2px;
    position: relative;
    align-items: center;
    background: #ffffff;
    margin-top: 20px;
    border-bottom: 1px solid #d9dcf0;
    h3 {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: #757a80;

      @media screen and (min-width: 640px) {
        font-size: 2rem;
        line-height: 2.8rem;
      }
    }
  }
  .accordion__button:hover {
    background-color: #fafafa;
  }
  p {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 24px;
    color: #5f5f8c;
  }
  .accordion__button:before {
    display: inline-block;
    content: "";
    /* height: 10px;
        width: 10px; */
    /* border-bottom: 2px solid currentColor;
        border-right: 2px solid currentColor; */
    /* transform: rotate(-45deg); */
    position: absolute;
    right: 0;
    background-image: url(${arrowUp});
    background-size: 24px 24px;
    height: 24px;
    width: 24px;
  }
  .accordion__button[aria-expanded="true"]::before,
  .accordion__button[aria-selected="true"]::before {
    position: absolute;
    right: 0;
    background-image: url(${arrowDown});
    background-size: 24px 24px;
    height: 24px;
    width: 24px;
  }
  [hidden] {
    display: none;
  }
  .accordion__panel {
    /* padding: 20px; */
    animation: fadein 0.35s ease-in;
    margin: 1em 0;
    div.section {
      margin: 1em 0;
    }
    div.list p {
      /* padding-left: 1.2em; */
    }
  }
  /* -------------------------------------------------- */
  /* ---------------- Animation part ------------------ */
  /* -------------------------------------------------- */
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const AccordionStyles = {
  Wrapper,
};
