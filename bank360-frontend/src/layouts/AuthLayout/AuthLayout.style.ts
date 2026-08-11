import styled from "styled-components";

export const AuthLayoutStyle = styled.section`
  display: flex;
  min-height: 100vh;
  color: white;
  background-color: #f6f8fa;

  .left {
    width: 50%;
    background-color: #3e1b4b;
    padding: 3.75rem 5rem;
    position: relative;
    padding-bottom: 112px;

    & * {
      z-index: 2;
    }
  }

  .logo {
    height: 7em;
    width: 20em;
    position: relative;
    z-index: 4;
    margin-top: 1rem;
  }

  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  // .money-emoji {
  //   margin-top: 1rem;
  //   position: relative;
  //   z-index: 5;
  // }

  h1 {
    font-size: 4em;
    width: 70%;
    margin-top: 5rem;
    font-weight: 800;
    line-height: 56px;
    position: relative;
    z-index: 5;
  }

  h6 {
    font-size: 2.4em;
    width: 85%;
    color: #ffffff;
    opacity: 0.6;
    margin-top: 24px;
    font-weight: 400;
    font-size: 1.8em;
    line-height: 28px;
  }

  .top-quadrant {
    position: absolute;
    top: 0;
    left: 0;
    // z-index: 1;
  }

  .bottom-quadrant {
    bottom: 0;
    right: 0;
    position: absolute;
  }

  @media (max-width: 1300px) {
    h1,
    h6 {
      width: 100%;
    }
  }

  .form-container {
    color: #151e28;
    margin: 0 auto;
    margin-top: 0px;
    width: 80%;
    max-width: 480px;
    background: #ffffff;
    box-shadow: 0px 4px 0px #eff1f3;
    border-radius: 20px;
    padding: 40px;

    @media (max-width: 760px) {
      margin-top: 40px;
    }
  }

  h2 {
    font-weight: 600;
    font-size: 2.4em;
    line-height: 32px;
    text-align: center;
    color: #151e28;
    margin-bottom: 8px;
  }

  .sub-head {
    font-weight: 400;
    font-size: 1.6em;
    line-height: 24px;
    color: #99a0ae;
    text-align: center;
  }

  .auth-form {
    margin-top: 32px;
  }

  .auth-button {
    width: 100%;
    color: white;
    margin-top: 16px;
    padding: 16px;
    outline: none;
    border: none;
    background-color: var(--main-blue);
    font-weight: 600;
    font-size: 1.6em;
    line-height: 24px;
    border-radius: 8px;
    cursor: pointer;
    transition: 1s;

    &:hover {
      background-color: #367b96;
    }

    &:disabled {
      background-color: #f6f8fa;
      color: #99a0ae;
      cursor: not-allowed;
      cursor: not-allowed;
    }
  }

  .extra {
    text-align: center;
    font-weight: 400;
    font-size: 1.4em;
    line-height: 22px;
    color: #99a0ae;
    margin-top: 16px;

    a {
      font-weight: 600;
      color: #834ec6;

      &:hover {
        color: #60329a;
      }
    }
  }

  .bottom-bottom {
    display: none;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 60px;
    margin-bottom: 0px;
    position: relative;
    z-index: 6;

    &.sm-show {
      display: none;
      @media (max-width: 780px) {
        display: flex;
        justify-content: center;
      }
    }

    &.sm-none {
      @media (max-width: 780px) {
        display: none;
        justify-content: center;
      }
    }

    a {
      font-weight: 500;
      font-size: 1.4em;
      line-height: 22px;
      color: #99a0ae;
      padding: 0 24px;
      transition: 1s;
      &:first-child {
        padding-left: 0;
      }

      &.middle {
        border-right: 2px solid #e6e8ec;
        border-left: 2px solid #e6e8ec;
        /* background-color: white; */
      }

      &:hover {
        color: white;
      }
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;
    background-color: #34215c;

    .logo {
      height: 2rem;
      width: 10rem;
    }

    .bottom-quadrant {
      display: none;
    }

    .left {
      width: 100%;
    }

    .left,
    .right {
      padding: 2rem calc(0.06 * 100vw);
    }
    .right {
      width: 100%;
      position: relative;
      margin-top: 0;
      padding-top: 0;
    }
    .bottom-bottom {
      bottom: 0;
      right: 0;
      position: absolute;
      display: block;
    }

    .form-container {
      z-index: 3;
      margin-bottom: 60px;
      max-width: 100%;
      width: 100%;
      padding: 32px 24px;
      margin-top: 40px;
    }

    .money-emoji {
      margin-top: 60px;

      svg {
        height: 50px;
        width: 50px;
      }
    }

    h1 {
      font-size: 3.2em;
      margin-top: 24px;
      line-height: 48px;
    }
  }

  @media (max-width: 480px) {
    .logo {
      height: 2rem;
      width: 10rem;
    }

    h1 {
      font-size: 2.8em;
      margin-top: 24px;
      line-height: 40px;
    }

    h6 {
      font-size: 1.4em;
      margin-top: 16px;
      line-height: 24px;
    }

    h2 {
      font-size: 2em;
      line-height: 24px;
    }
    .sub-head {
      font-size: 1.4em;
    }

    footer {
      margin-top: 40px;
    }
  }
`;
