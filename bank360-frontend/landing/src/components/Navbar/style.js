import styled from "styled-components";

const Wrapper = styled.header`
  box-shadow: 0px 2px 40px rgba(83, 83, 121, 0.04), 0px 1px 0px #ededf2;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background: white;
  border-bottom: 1px solid #eaeaef;
  .logo {
    height: 3rem;
    width: 15rem;

    @media screen and (min-width: 640px) {
      height: 3rem;
      width: 15rem;
    }

    @media screen and (min-width: 1200px) {
      height: 3rem;
      width: 15rem;
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
  }

  .menu-btn {
    height: 20px;

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }

  nav {
    display: none;

    @media screen and (min-width: 1024px) {
      display: flex;
      align-items: center;

      a {
        margin: 0 16px;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 22px;
        color: #757a80;
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

  .register-btn {
    display: none;

    @media screen and (min-width: 1024px) {
      display: flex;
      font-weight: 700;
      font-size: 1.4rem;
      line-height: 22px;
      color: var(--main-white);
      padding: 12px 24px;
      background: var(--theme);
      border-radius: 8px;

      &:hover {
        background-color: var(--theme-hover);
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
    @media screen and (min-width: 1024px) {
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

      &:hover {
        background-color: var(--theme-hover);
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
