import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: "Outfit", serif;
    font-optical-sizing: auto;
    font-style: normal;
    transition: 0.5s ease;
  }

  body {
    background: var(--main-white);
  }

  a {
    text-decoration: none;
  }

  fieldset {
    border: none;
    outline: none;
    background: none;
  }

  button {
    cursor: pointer;
    background: none;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-wrapper {
    padding: 10rem;

    @media (max-width: 1320px) {
      padding: 10rem;
    }

    @media (max-width: 1024px) {
      padding: 10rem;
    }

    @media (max-width: 800px) {
      padding: 10rem;
    }

    @media (max-width: 640px) {
      padding: var(--main-pad-sm);
    }

    @media (max-width: 560px) {
      padding: var(--main-pad-sms);
    }

    @media (max-width: 420px) {
      padding: var(--main-pad-xs);
    }

    @media (min-width: 1800px) {
      & > * {
        padding: 0;
        max-width: 1320px;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    }
  }

  input {
    border: none;
    outline: none;
    background: transparent;
  }
`;

export default GlobalStyle;
