import styled from "styled-components";

export const AnalyticsStyle = styled.section`
  .main main {
    padding: 0;
  }

  .overview {
    display: flex;
    justify-content: space-between;
    padding-bottom: 64px;

    &__flex {
      display: flex;
      justify-content: space-between;
      width: 100%;

      &-left {
        width: 38%;
      }

      &-right {
        width: 60%;
      }

      @media (max-width: 1400px) {
        flex-direction: column;

        & > * {
          width: 100%;
        }
      }
    }

    &__nav {
      width: 220px;
      background: #ffffff;
      border: 1px solid #ecf0f3;
      border-radius: 10px;
      margin-right: 24px;

      span {
        display: block;
        border-bottom: 1px solid #ecf0f3;
        padding: 16px;
        h3 {
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
          color: #151e28;
        }
      }

      &-main {
        padding: 16px;
        /* overflow-y: scroll; */
      }

      button {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #99a0ae;
        padding: 8px 12px;
        border-radius: 4px;
        width: 100%;
        text-align: left;
        margin-bottom: 16px;
        text-transform: capitalize;

        &.selected {
          background: #f6f8fa;
        }
      }
    }

    &__graph {
      background: #ffffff;
      border: 1px solid #ecf0f3;
      border-radius: 10px;
      padding: 24px;
      width: 100%;

      .graph {
        margin-top: 24px;
      }

      small {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #99a0ae;
      }

      .flex {
        display: flex;
        align-items: center;
        margin-top: 8px;

        span {
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          /* identical to box height, or 150% */

          text-align: right;
          border-radius: 4px;
          padding: 4px 8px;

          &.gain {
            background: #e0fae6;
            color: #627f6f;
          }

          &.loss {
            color: #e3452f;
            background: rgba(227, 69, 47, 0.1);
          }
        }

        h3 {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          text-align: right;
          color: #151e28;
          margin-right: 16px;
        }

        .var {
          color: #627f6f;
          padding: 4px 12px;
          background: #e0fae6;
          border-radius: 4px;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }

  .transactions-table {
    margin-top: 24px;
  }

  .cards-closing {
    border: 1px solid #ecf0f3;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .cone {
      position: absolute;
      top: 0;
      right: 0;
      transform: rotate(180deg);
    }

    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #99a0ae;
      margin-bottom: 16px;
    }

    h2 {
      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
      color: #151e28;
      margin-bottom: 4px;
    }

    small {
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      color: #99a0ae;

      b {
        font-weight: 600;
      }
    }
  }

  .months {
    background: #f6f8fa;
    border-radius: 10px;
    padding: 24px;
    margin: 24px 0;
    display: flex;
    align-items: center;
    /* justify-content: center; */

    &__nav {
      display: block;
      margin-right: 24px;

      button {
        display: block;
        color: #5d6167;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        padding: 4px 8px;
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        &.selected {
          background: #ffffff;
          box-shadow: 0px 2px 0px #eff1f3;
          border-radius: 6px;
          color: #151e28;
          font-weight: 600;
        }
      }
    }

    &__display {
      /* display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; */
      p {
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #99a0ae;
        margin-bottom: 16px;
      }

      h2 {
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #151e28;
      }
    }
  }

  .recommendations {
    background: #f6f8fa;
    border-radius: 10px;
    padding: 16px;
    margin: 24px 0;
    height: 170px;
    overflow-y: scroll;

    aside {
      padding: 4px 12px;
      background: #ffffff;
      box-shadow: 0px 2px 0px #eff1f3;
      border-radius: 6px;
      margin-bottom: 16px;

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #151e28;
      }
    }
  }

  .credit-score-history {
    border: 1px solid #ecf0f3;
    border-radius: 10px;

    header {
      padding: 16px 24px;
      border-bottom: 1px solid #ecf0f3;

      h6 {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #151e28;
      }
    }

    &__list {
      padding: 16px;
      overflow-y: scroll;
      list-style-type: none;
      max-height: 472px;

      &-item {
        border: 1px solid #ecf0f3;
        border-radius: 10px;
        padding: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        @media (max-width: 560px) {
          padding: 24px 16px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        & > p {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #99a0ae;
        }

        & > div {
          display: flex;
          align-items: center;
          color: #151e28;

          p {
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;
          }

          span {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            background: #f0f9fa;
            border-radius: 4px;
            padding: 2px 6px;
          }
          & > * {
            margin-right: 10px;
          }
        }
      }
    }
  }

  .s-s {
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    margin-top: 24px;

    .dashboard-header {
      padding: 0 24px;
      border-bottom: 1px solid #ecf0f3;
      padding-bottom: 24px;
      padding-top: 8px;
      margin-bottom: 0;
      padding-top: 24px;
      &__title {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 4px;
      }
    }

    &__table {
      border: none;
    }

    @media (max-width: 780px) {
      .dashboard-header {
        padding: 16px;
      }
    }
  }

  .panel {
    padding: 0;
  }
  .tab-content {
    padding: 32px;
  }

  @media (max-width: 1300px) {
    .overview {
      flex-direction: column;

      & > * {
        width: 100%;
      }

      &__nav {
        margin-right: 0;
        margin-bottom: 24px;

        button {
          width: auto;
          min-width: 160px;
          text-align: center;
          &:last-child {
            margin-bottom: 0;
          }
        }

        nav {
          display: flex;
          overflow-x: scroll;
          align-items: center;
          ::-webkit-scrollbar {
            height: 0px;
          }

          & > * {
            margin-bottom: 0;
          }
        }
      }

      &__graph {
        padding: 24px 0;

        &-header {
          text-align: center;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .flex {
            flex-direction: column;

            h3 {
              margin-bottom: 12px;
              margin-right: 0;
            }
          }
        }
      }
    }
  }

  .abs {
    position: absolute;

    &-2 {
      bottom: 9px;
      left: 9px;
      transform: rotate(30deg);
    }

    &-1 {
      left: 50%;
      transform: translateX(-50%);
      top: 0;
    }

    &-3 {
      right: 24px;
      bottom: 10px;
    }
  }

  .footprint {
    &-overview {
      margin-top: 1.5rem;
      border-radius: 10px;
      &__card {
        background: #f6f8fa;
        border-radius: 10px 10px 0px 0px;
        display: flex;
        align-items: center;
        position: relative;

        &-item {
          border-right: 1px solid #e6e8ec;
          width: calc(calc(100% / 3) - 2px);
          text-align: center;
          padding: 52px 48px;

          h1 {
            font-weight: 700;
            font-size: 32px;
            line-height: 40px;
            color: #151e28;
            margin-top: 4px;

            span {
              color: #99a0ae;
              font-weight: 400;
            }
          }

          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            /* identical to box height, or 157% */

            /* Text/body */

            color: #99a0ae;
          }

          &:last-child {
            border-right: none;
          }

          @media screen and (max-width: 1260px) {
            /* h1 {
              font-size: 28px;
            } */
            padding: 40px 20px;
          }
          @media screen and (max-width: 900px) {
            h1 {
              font-size: 26px;
              line-height: 32px;
            }
            padding: 40px 20px;
          }

          @media screen and (max-width: 640px) {
            width: 100%;
            border-bottom: 1px solid #e6e8ec;
            border-right: none;
            padding: 24px 16px;

            h1 {
              font-size: 24px;
            }

            &:last-child {
              border-bottom: none;
            }
          }
        }
        @media screen and (max-width: 640px) {
          flex-direction: column;
        }
      }

      &__footer {
        background: #ffffff;
        border: 1px solid #e6e8ec;
        border-radius: 0px 0px 10px 10px;
        padding: 16px;
        display: flex;
        align-items: center;

        svg {
          margin-right: 16px;
        }

        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #5d6167;
        }
      }
    }
  }

  .table-container {
    width: 100%;
    overflow-x: scroll;
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    margin-top: 24px;

    .header {
      width: 100%;
      padding: 20px 24px;
      border-bottom: 1px solid #e6e8ec;

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #151e28;
      }
    }
  }

  table {
    width: 100%;
    border-radius: 10px;
  }

  th {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #151e28;
  }

  th,
  td {
    text-align: left;
    padding: 15px 24px;
    border-bottom: 1px solid #ecf0f3;

    &.dater {
      min-width: 180px;
    }

    &.catr {
      min-width: 180px;
    }
  }

  tr:last-child {
    td {
      border-bottom: none;
    }
  }

  .category {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #99a0ae;
    text-transform: capitalize;
  }

  .date {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #99a0ae;
  }
  .print {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #151e28;
  }
`;
