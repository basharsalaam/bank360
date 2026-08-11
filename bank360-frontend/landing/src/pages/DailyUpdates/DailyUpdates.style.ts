import styled from "styled-components";

export const DailyUpdatesStyle = styled.section`
  .balances-card {
    padding: 24px 40px;
    background: #f6f8fa;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 192px;
    & > * {
      display: flex;
      width: 50%;
      align-items: center;
    }

    .one {
      width: 95%;
    }

    .two {
      width: 95%;
    }

    .three {
      width: 95%;
    }

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      .two {
        width: 100%;
      }

      .icon-flow {
        display: flex;
        align-items: center;
        width: 100%;

        p {
          font-weight: 600;
          font-size: 1.4em;
          /* margin-left: 4px; */
          line-height: 22px;
          color: #99a0ae;
        }
      }

      .two-top,
      .three-top {
        margin-bottom: 40px;
      }

      h2 {
        font-weight: 600;
        font-size: 1.8em;
        line-height: 26px;
        color: #151e28;
        margin-top: 4px;
      }
    }

    small {
      font-weight: 400;
      font-size: 1.4em;
      line-height: 22px;
      color: #99a0ae;
    }
    h1 {
      font-weight: 700;
      font-size: 2.4em;
      line-height: 40px;
      color: #151e28;
      margin-top: 2px;
    }
  }

  .updates-container {
    header {
      padding: 16px;
      border-bottom: 1px solid #ecf0f3;
      h4 {
        font-weight: 600;
        font-size: 1.4em;
        line-height: 22px;
        color: #151e28;
      }
    }
    /* Background/white */

    background: #ffffff;
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    margin-top: 24px;

    .updates-content {
      display: flex;
    }

    .updates-card {
      width: 25%;
      border-right: 1px solid #ecf0f3;
      padding: 16px;
      padding-bottom: 0;

      h6 {
        font-weight: 700;
        font-size: 1.4em;
        line-height: 22px;
        color: #151e28;
      }
      &:last-of-type {
        border-right: none;
      }

      &-main {
        margin-top: 16px;
        & > section {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 16px;

          small {
            font-weight: 500;
            font-size: 1.2em;
            line-height: 20px;
            color: #99a0ae;
          }

          h6 {
            font-weight: 700;
            font-size: 1.4em;
            line-height: 22px;
            color: #151e28;
            margin-top: 4px;
          }

          .diff {
            font-weight: 500;
            font-size: 1em;
            line-height: 12px;
            text-align: right;
            padding: 4px 8px;
            border-radius: 4px;
            align-items: center;
            display: flex;

            svg {
              margin-right: 4px;
            }

            &.green {
              background: #e0fae6;
              color: #627f6f;
            }

            &.red {
              color: #e3452f;
              background: #fdedeb;
            }
          }
        }
      }
    }
  }

  .balance-trends {
    background: #ffffff;
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    padding: 16px 24px;
    margin-top: 24px;

    header {
      h5 {
        font-weight: 700;
        font-size: 14px;
        line-height: 22px;
        color: #151e28;
      }
    }

    span {
      span {
        font-weight: 500;
        font-size: 12px !important;
        line-height: 15px;
        color: #99a0ae;
      }
    }
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -20px;

      h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #151e28;
      }

      h4 {
        margin-top: 4px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #99a0ae;
      }
    }
  }
  .graph {
    margin-top: 40px;
  }

  @media (max-width: 1400px) {
    #chart {
      padding-top: 24px;
    }
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .header-flex {
      margin-top: 24px;

      & > * {
        &:first-child {
          margin-left: 0;
        }
      }
    }

    .balances-card {
      flex-direction: column;
      padding: 32px;
      & > * {
        width: 100%;
      }

      &__first {
        margin-bottom: 32px;
      }
    }
    .balances-card-item .two-top {
      margin-bottom: 32px;
    }

    .updates-container {
      .updates-content {
        flex-wrap: wrap;
      }

      .updates-card {
        width: 50%;
        border-bottom: 1px solid #ecf0f3;

        &:nth-child(2n) {
          border-right: none;
        }
        &:nth-child(3) {
          border-bottom: none;
        }
        &:nth-child(4) {
          border-bottom: none;
        }
      }
    }
  }

  @media (max-width: 750px) {
    .header-flex {
      width: 100%;
      & > * {
        width: 100%;
        margin-bottom: 12px;
      }
    }
    .balances-card {
      small {
        font-size: 1.2em;
        line-height: 18px;
      }

      h1 {
        font-size: 2.4em;
      }
    }
    .balances-card-item .icon-flow p {
      font-size: 1.2em;
      line-height: 18px;
    }
  }

  @media (max-width: 600px) {
    .balance-trends {
      .title {
        margin-top: 0px;
        text-align: left;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }
    .updates-container {
      .updates-card {
        width: 100%;
        border-bottom: 1px solid #ecf0f3;
        border-right: none;

        /* &:nth-child(2n) {
                    border-right: none;
                } */
        /* &:nth-child(3) {
                    border-bottom: none;
                } */
        &:nth-child(4) {
          border-bottom: none;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .balances-card {
      & > * {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;

        & * {
          width: 100%;
        }
      }

      /* &__first {
                margin-bottom: 32px;
            } */
    }
    .balances-card-item {
      margin-bottom: 24px;
    }
  }
`;
