import styled from "styled-components";

export const AuthLayoutStyle = styled.section`
  display: flex;
  min-height: 100vh;
  color: white;
  background-color: #f6f8fa;

  *{
    padding: 0px;
    margin: 0px;
  }

  .left {
    width: 50%;
    background-color: #34215C;
    position: relative;
    padding-left: 5rem;

    & * {
      z-index: 2;
    }
  }

  .logo {
    height: 5em;
    width: 17rem;
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

  .money-emoji {
    margin-top: 10rem;
    position: relative;
    z-index: 5;
  }

  h1 {
    font-size: 5rem;
    width: 100%;
    margin-top: 2rem;
    font-weight: 800;
    line-height: 56px;
    position: relative;
    z-index: 5;
    color: #FFFFFF;
  }

  h6 {
    max-width: 80%;
    color: #FFFFFF;
    opacity: 0.6;
    margin-top: 24px;
    font-weight: 400;
    font-size: 1.8rem;
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
    z-index: 0;
  }

  @media (max-width: 1300px) {
    h1,
    h6 {
      width: 100%;
    }
  }

  .form-container {
    color: #151e28;
    margin: 0px auto;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    height: 650px;
    width: 70%;
    background: #ffffff;
    box-shadow: -6px 6px 4px #eff1f3;
    border-radius: 20px;
    padding-top: 1.5rem;
    padding-right: 3rem;
    padding-left: 3rem;

    @media (max-width: 760px) {
      margin-top: 40px;
    }
  }

  h2 {
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 32px;
    text-align: center;
    color: #151e28;
    margin-bottom: 8px;
  }

  .sub-head {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 24px;
    color: #99a0ae;
    text-align: center;
    margin-bottom: 1rem;
  }

  .auth-form {
    margin: 0px auto;

    label{
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    input{
    width: 97%;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 1rem;

    }

  }

  .auth-button {
    width: 100%;
    color: white;
    margin-top: 16px;
    padding: 16px;
    outline: none;
    border: none;
    background-color: var(--theme);
    font-weight: 600;
    font-size: 1.6rem;
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
    font-size: 1.3rem;
    line-height: 1rem;
    color: #99a0ae;
    margin-top: 15px;
    margin-bottom: 2rem;

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
    margin-top: 5rem;
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
      display: flex;
      @media (max-width: 1170px) {
        display: none;
        justify-content: center;
      }
    }

    a {
      font-weight: 500;
      font-size: 1.4rem;
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


  @media (max-width: 1170px) {
    flex-direction: column;
    background-color: #f6f8fa;

    .logo {
      height: 5rem;
      width: 17rem;
      margin-left: 2rem;
    }

    .left {
      width: 100%;
      padding-left: 0rem;
    }

    .right {
      width: 100%;
      position: relative;
      margin-top: 0;
      padding-top: 0;
      background-color: #F4F6FA;
    }
    .bottom-bottom {
      bottom: -1;
      right: 0;
      position: absolute;
      display: none;
    }
    .form-container {
      z-index: 3;
      margin-bottom: 2rem;
      width: 85%;
      margin-top: 2rem;
    }
    .money-emoji {
      margin-top: 2rem;
      width: 100%;
      svg {
        height: 50px;
        width: 50px;
      }
    }

    @media (max-width: 600px) {
      .form-container{
        width: 85%;
      } 
    }

    h1 {
      font-size: 3rem;
      margin-top: 24px;
      line-height: 1.3;
      text-align: center;
      margin: 0px auto;
      margin-bottom: 2rem;
    }
      h6{
        font-size: 1.4rem;
        text-align: center;
        margin: 0px auto;
        margin-bottom: 2rem;
        line-height: 1.5;
      }
  }

  @media (max-width: 480px) {
    .top-quadrant{
      width: 13rem;
      margin-top: -10px;
    }

    .bottom-bottom{
      width: 13rem;
      margin-bottom: -10px;
    }
    .logo {
      margin-left: 2rem;
      height: 5rem;
      width: 16rem;
    }

    h1 {
      font-size: 3.5rem;
      line-height: 40px;
      max-width: 300px;
      width: 80%;
      margin: 2rem auto;
      text-align: center;
    }

    h6 {
      font-size: 1.4rem;
      line-height: 24px;
      max-width: 350px;
      text-align: center;
      margin: 0px auto;
      margin-bottom: 2rem;

    }

    h2 {
      font-size: 2.5rem;
      line-height: 24px;
    }
    .sub-head {
      font-size: 1.4rem;
    }

    footer {
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
    }
  }
`;
