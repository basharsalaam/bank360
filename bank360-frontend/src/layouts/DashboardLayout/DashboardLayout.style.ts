import { BREAKPOINTS } from "./../../utils/constants/index";
import styled from "styled-components";

export const DashboardLayoutStyle = styled.section<{
  collapsedMenu: boolean;
  menuOpen: boolean;
}>`
  display: flex;
  .s-bnk {
    height: 38px;
    min-width: 200px !important;
  }

  & * {
    transition: 1s;
  }

  .roll {
    animation-name: roll;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes roll {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .refresh-select {
    border: none;
    padding: 0;
    width: 120px;
    display: flex;
    justify-content: flex-end;
  }

  .displayed {
    width: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .side-bar {
    width: ${(props) => (props.collapsedMenu ? "94px" : "264px")};
    min-height: 100vh;
    background-color: #f6f8fa;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding: ${(props) => (props.collapsedMenu ? "24px 16px" : "24px")};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
      width: 0;
      border-radius: 10px;
    }

    &:hover {
      /* width */
      ::-webkit-scrollbar {
        width: 4px;
        border-radius: 10px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #f6f8fa;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #e5ebf1;
        border-radius: 10px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #cdd9e4;
      }
    }

    & > * {
      width: 100%;
    }

    a {
      transition: 1s;
      font-weight: 500;
      font-size: 1.4em;
      line-height: 22px;
      color: #5d6167;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      padding: 12px 14px;

      &:hover {
        color: #151e28;
        transform: translateX(10px);
      }

      &.active {
        font-weight: 700;
        color: #151e28;
        background: #ffffff;
        box-shadow: 0px 2px 0px #eff1f3;
        border-radius: 6px;
      }

      svg {
        height: 18px;
        width: 18px;
        margin-right: ${(props) => (props.collapsedMenu ? "0" : "16px")};
      }
    }
    @media (max-width: ${BREAKPOINTS.lg}px) {
      transform: ${(props) =>
        props.menuOpen ? "translateX(0)" : "translateX(-264px)"};
      z-index: 88484848;
      box-shadow: 2px 0px 0px #eff1f3;
    }
  }

  .nav-links {
    padding: ${(props) => (props.collapsedMenu ? "0 8px" : "0")};
  }

  .overlay {
    display: none;
  }

  @media (max-width: ${BREAKPOINTS.lg}px) {
    .overlay {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #ededed;
      opacity: 0.3;
    }
  }

  .user-card {
    background-color: #34215c;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0px 2px 0px #eff1f3;
    display: flex;
    align-items: center;
    position: relative;

    h3 {
      font-weight: 700;
      font-size: 1.4em;
      line-height: 22px;
      margin-bottom: 2px;
      color: #ffffff;
    }

    p {
      font-weight: 400;
      font-size: 1.2em;
      line-height: 20px;
      color: #bfbfd4;
    }

    .avatar-card {
      margin-right: ${(props) => (props.collapsedMenu ? "0" : "8px")};
    }

    .collapse-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -11px;
      background: #ffffff;
      border: 1px solid #e2e2e2;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .second-card {
    margin-top: 130px;
    border: 1px solid #ecf0f3;
    background: white;
    margin-bottom: 24px;
    justify-content: space-between;

    h3 {
      color: #151e28;
    }

    p {
      color: #94a6b3;
      font-size: 1em;
    }
  }

  .collapse-btn {
    background: #ffffff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 1px 0px #ecf0f3;
    margin: 0 auto;
    margin-bottom: 24px;
  }
  .top {
    margin-top: 24px;
    border-bottom: 1px solid #e5ebf1;
  }

  .bottom {
    margin-top: 24px;
  }

  .avatar-card {
    margin-right: 8px;
  }

  .menu-btn {
    display: none;
  }

  .main {
    margin-left: ${(props) => (props.collapsedMenu ? "94px" : "264px")};
    width: ${(props) =>
      props.collapsedMenu ? "calc(100% - 94px)" : "calc(100% - 264px)"};

    @media (max-width: ${BREAKPOINTS.lg}px) {
      margin-left: 0;
      width: 100%;
      .menu-btn {
        display: block;
        margin-right: 8px;
      }
    }

    .header {
      display: flex;
      align-items: center;
    }
  }

  .d-none {
    display: none !important;
  }

  .top-nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;

    @media (max-width: 800px) {
      padding: 16px calc(0.035 * 100vw);
    }
    background: #ffffff;
    box-shadow: 0px 1px 0px #ecf0f3;

    h2 {
      font-weight: 600;
      font-size: 1.8em;
      line-height: 26px;
      color: #151e28;
    }

    .refresh-btn {
      background: #f3f3f5;
      border-radius: 6px;
      padding: 8px 14px;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #151e28;
      display: flex;

      &:hover {
        background: #d5d5dc;
      }
      svg {
        margin-right: 8px;
      }

      span {
      }
      @media (max-width: 480px) {
        span {
          display: none;
        }
        svg {
          margin-right: 0;
        }
      }
    }
  }

  .main main {
    padding: 32px;

    @media (max-width: 800px) {
      padding: 24px calc(0.035 * 100vw);
    }
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;

    &.start {
      justify-content: flex-start;
    }

    &__title {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: #151e28;
      margin-bottom: 10px;

      & > * {
        display: flex;
        align-items: center;

        @media (max-width: 560px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }

    &__sub {
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #99a0ae;
    }
  }

  .header-flex {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 12px;
    }
  }

  .divider {
    width: 1px;
    height: 38px;
    background: #ecf0f3;
  }

  @media (max-width: 750px) {
    .dashboard-header {
      flex-wrap: wrap;

      &__title {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
      }

      &__left {
        width: 100%;
      }
    }

    .header-flex {
      flex-wrap: wrap;
      margin-top: 16px;

      .full-width {
        width: 100%;
      }

      .add-bank-btn {
        margin-top: 16px;
      }

      & > * {
        margin-left: 0;
      }
    }

    .divider {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .header-flex {
      width: 100%;
    }
  }
`;
