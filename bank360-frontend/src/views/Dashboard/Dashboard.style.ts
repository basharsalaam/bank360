import styled from "styled-components";

export const DashboardStyle = styled.section`
  .gain {
    background: #e0fae6;
    color: #627f6f;
  }
  .loss {
    color: hsla(7, 76%, 54%, 1) !important;
    background-color: hsla(7, 76%, 93%, 1) !important;
  }
  .cards {
    display: flex;
    justify-content: space-between;

    &-closing {
      border: 1px solid #ecf0f3;
      box-sizing: border-box;
      border-radius: 10px;
      padding: 16px;
      position: relative;
      width: 30%;

      .cone {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(180deg);
      }

      .header {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 233;

        p {
          margin-right: 56px;
          font-weight: 500;
          font-size: 1.4em;
          line-height: 22px;
          color: #99a0ae;
        }

        span {
          font-weight: 500;
          font-size: 1.2em;
          line-height: 20px;
          text-align: right;
          color: #627f6f;
          background: #e0fae6;
          border-radius: 4px;
          padding: 4px 12px;
        }
      }
      h2 {
        font-weight: 700;
        font-size: 2.8em;
        line-height: 40px;
        color: #151e28;
        margin-top: 20px;
      }
      h6 {
        margin-top: 8px;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #99a0ae;
      }
    }

    &-filled {
      background: #f6f8fa;
      border-radius: 10px;
      padding: 24px 48px;
      display: flex;
      width: 68%;
      justify-content: space-between;
      align-items: center;

      .divider {
        width: 2px;
        height: 60px;
        background: #ecf0f3;
      }

      & > section {
        p {
          font-weight: 500;
          font-size: 1.4em;
          line-height: 22px;
          color: #99a0ae;
        }

        h2 {
          margin-top: 8px;
          font-weight: 700;
          font-size: 1.8em;
          line-height: 32px;
          color: #151e28;
          margin-bottom: 8px;
        }
        span {
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #99a0ae;
        }

        & > div {
          display: flex;

          svg {
            margin-right: 4px;
          }
        }
      }
    }
  }

  .transactions-table {
    margin-top: 24px;
  }
  .dashboard-main {
    transition: none;
  }

  .graph {
    margin-top: 24px;
    background: #ffffff;
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    padding: 24px;

    header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    main {
      padding: 0;
    }

    &-title {
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #151e28;
    }

    &-labels {
      display: flex;
      align-items: center;

      > div {
        display: flex;
        align-items: center;
        &:first-child {
          margin-right: 24px;
        }

        p {
          font-weight: 400;
          font-size: 1.4em;
          line-height: 22px;
          color: #151e28;
        }

        span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 10px;

          &.purple {
            background: #834ec6;
          }

          &.orange {
            background: #f9884c;
          }
        }
      }
    }
  }

  .show-1400 {
    display: none;
  }

  .s-bnk {
    height: 38px;
  }

  @media (max-width: 1400px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
      &__first {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
    }

    #chart {
      padding-top: 32px;
    }

    .show-1400 {
      display: block;
      align-self: center;
    }

    .hide-1400 {
      display: none;
    }

    .header-flex {
      margin-top: 24px;

      & > * {
        &:first-child {
          margin-left: 0;
        }
      }
      .divider {
        display: none;
      }
    }
  }

  @media (max-width: 900px) {
    .cards {
      flex-wrap: wrap;

      &-closing {
        width: 100%;
      }
      &-filled {
        width: 100%;
        margin-top: 24px;
      }
    }
  }

  @media (max-width: 750px) {
    .header-flex {
      & > * {
        width: 100%;
        margin-bottom: 12px;
      }
    }
  }

  @media (max-width: 650px) {
    .cards {
      flex-wrap: wrap;

      &-closing {
        width: 100%;

        h2 {
          font-size: 2.4em;
        }
      }
      &-filled {
        width: 100%;
        margin-top: 24px;
        flex-wrap: wrap;
        padding: 32px;
        /* flex-direction: column; */
      }
    }
  }

  .graph,
  #chart {
    transition: none;
  }

  @media (max-width: 480px) {
    .cards {
      &-filled {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        & > section {
          margin-bottom: 40px;
          &:last-child {
            margin-bottom: 0;
          }
          h2 {
            margin: 12px 0 8px 0;
          }
        }
      }
    }

    .graph-labels {
      & > div {
        p {
          font-size: 1.2em;
        }
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
`;

// make the password checker uniform
// shift footer on sign in and signup to the left part
