import styled from "styled-components";

const Wrapper = styled.header`
  box-shadow: 0px 2px 40px rgba(83, 83, 121, 0.04), 0px 1px 0px #ededf2;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background: white;
  border-bottom: 1px solid #eaeaef;
  position: fixed; 
  top: 0; 
  left: 0; 
  z-index: 999;
  width: 100%;

  .logo {
    height: 3rem;
    width: 15rem;

     @media screen and (min-width: 50px) {
      width: 11rem;
    }

    @media screen and (min-width: 350px) {
      width: 13rem;
    }

    @media screen and (min-width: 1200px) {
      width: 15rem;
    }

    @media screen and (max-width: 260px) {
      width: 8rem;
    }
  }

  .logo-dropdown {
    height: 5rem;
    width: 5rem;

    @media screen and (min-width: 640px) {
      height: 5rem;
      width: 5rem;
    }

    @media screen and (min-width: 1200px) {
      height: 5rem;
      width: 5rem;
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;

    @media screen and (min-width: 50px) {
      padding: 0px 1rem;
    }

    @media screen and (min-width: 300px) {
      padding: 0px 3rem;
    }

    @media screen and (min-width: 650px) {
      padding: 0px 8rem;
    }

    @media screen and (min-width: 800px) {
      padding: 0px 10rem;
    }
  }

  .menu-btn {
    height: 20px;

    @media screen and (min-width: 1130px) {
      display: none;
    }
  }

  nav {
    display: none;

    @media screen and (min-width: 1130px) {
      display: flex;
      align-items: center;

      a {
        margin: 0rem 4rem;
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 22px;
        color: #000000;
        position: relative;

        &.active {
          color: var(--text-main);
          font-weight: 700;

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -16px;
            width: 10px;
            height: 10px;
            background: var(--theme);
            border-radius: 50%;
          }
        }
      }
    }

  }

  .nav-btns{
    display: flex;
    align-items: center;

    @media screen and (max-width: 1130px) {
      display: none;
    }
  }

  .register-btn {
    display: none;

    @media screen and (min-width: 1130px) {
      display: flex;
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 22px;
      color: var(--main-white);
      padding: 10px 24px;
      background: #34215C;
      border-radius: 5rem;
      width: max-content;


      &:hover {
        background-color: #01A0C6;
        color: #FFFFFF;
      }
    }
  }
  
  .login-btn {
    display: none;

    @media screen and (min-width: 1130px) {
      display: flex;
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 22px;
      color: #01A0C6;
      padding: 10px 24px;
      background: var(--accent-white);
      border: 0.5px solid #01A0C6;
      border-radius: 5rem;
      margin-right: 1.5rem;
      width: max-content;


      &:hover {
        background-color: #EBEBEB;
      }
    }
  }

  .dropdown {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    @media screen and (min-width: 1130px) {
      display: none;
    }

    .register-btn-nav {
      display: flex;
      font-weight: 700;
      font-size: 1.4rem;
      line-height: 22px;
      color: var(--main-white);
      padding: 12px 24px;
      background: var(--theme);
      border-radius: 8px;
      justify-content: center;
      margin-top: 32px;
      width: 100%;

      &:hover {
        background-color: var(--theme-hover);
      }
    }

    .login-btn-nav {
      display: flex;
      font-weight: 700;
      font-size: 1.4rem;
      line-height: 22px;
      color: var(--text-main);
      padding: 12px 24px;
      background: var(--main-white);
      border-radius: 8px;
      border: 1px solid #67ADC8;
      justify-content: center;
      margin-top: 32px;
      margin-right: 3rem;
      width: 100%;


      &:hover {
        background-color: var(--accent-white);
      }
    }

    &__container {
      background: #ffffff;
      padding: 18px 20px;
      position: fixed;
      z-index: 2;
      top: 0;
      height: 100vh;
      bottom: 0;
      right: 0;
      width: 246px;
      display: block;

      .logo-link {
        margin-bottom: 16px;
      }

      svg {
        height: 32px;
        width: 99.2px;
      }

      a {
        padding: 5px 9px;
        display: block;
        border-radius: 6px;
        transition: 1s;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 22px;
        color: #5d6167;
        &:not(:first-child) {
          margin-bottom: 20px;
        }

        &:hover {
          transform: translateX(4px);
        }

        &.active {
          background: #f0f9fa;
          box-shadow: 0px 2px 0px #67adc8;
          font-weight: 700;
          color: #151e28;
          font-size: 1.6rem;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.25);
  }
`;

export const NavbarStyles = { Wrapper };
