import styled from "styled-components";
export const AnalyticsHeaderContainer = styled.section`
  .header-flex {
    justify-content: space-between;
    margin-top: 24px;
    align-items: center;

    .f-trend {
      max-width: 190px;
      min-width: 180px;
      margin-left: 16px;
    }

    & > * {
      display: flex;
      align-items: center;
    }
  }

  .input-group {
    margin: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid #ecf0f3;
    border-radius: 8px;
    padding: 8px 14px;

    input {
      width: 100%;
      background-color: transparent;
      border: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #99a0ae;
      outline: none;

      ::placeholder {
        color: #99a0ae;
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #99a0ae;
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #99a0ae;
      }
    }
  }

  .export-btn {
    font-size: 14px;
    margin-left: 16px;
    min-width: 108px;
  }
  .divider {
  }

  .right > * {
    margin-left: 16px;
  }

  .show-1400 {
    display: none;
  }

  .s-bnk {
    height: 38px;
  }

  button {
    font-size: 14px;
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
      width: 100%;

      .right {
        margin-left: 0;
        width: 100%;
        & > * {
          &:first-child {
            margin-left: 0;
          }
          width: 100%;
          max-width: 100%;
        }
      }
      .divider {
        display: none;
      }
    }
  }

  @media (max-width: 750px) {
    .header-flex {
      .right {
        flex-wrap: wrap;
        & > * {
          width: 100%;
          margin-bottom: 12px;
          margin-left: 0;
        }
      }
    }
  }

  small {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;

    &.gain {
      color: #627f6f;
      background: #e0fae6;
      border-radius: 4px;
      padding: 4px 8px;
      margin-left: 10px;

      @media (max-width: 560px) {
        margin-left: 0;
        margin-top: 8px;
      }
    }
  }
`;
