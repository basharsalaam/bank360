import styled from "styled-components";
const HeaderContainer = styled.section`
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
  .divider {
    width: 1px;
    height: 38px;
    background: #ecf0f3;
    margin-left: 12px;
  }
  .download-btn {
    min-width: 120px;
    margin-left: 12px;
  }

  .show-1400 {
    display: none;
  }
  .hide-1400 {
    display: block;
  }
  div.selected {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    small {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #99a0ae;
      margin-bottom: 4px;
    }
  }

  .header-flex {
    .right {
      align-items: flex-end;
    }
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

    .show-1400 {
      display: block;
      align-self: center;
    }

    .hide-1400 {
      display: none !important;
    }

    .header-flex {
      margin-top: 24px;
      width: 100%;
      .right {
        margin-left: 0;
        width: 100%;
      }
      .f-trend {
        max-width: 100%;
        &:first-child {
          margin-left: 0;
          width: 100%;
        }
      }
      .divider {
        display: none;
      }
    }
  }
  .s-bnk {
    height: 38px;
  }

  @media (max-width: 750px) {
    .right {
      width: 100%;
      & > * {
        width: 100%;
        margin-bottom: 12px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  @media (max-width: 640px) {
    .right {
      flex-direction: column;

      & > * {
        margin-left: 0 !important;
      }
    }
  }

  .download-btn {
    background-color: #67adc8;
    color: #fff;
    border: none;
    &:disabled {
      background: #99a0ae;
      color: #f6f8fa;
      cursor: not-allowed;
    }
    .displayed {
      display: block;

      label {
        color: white;
      }
    }
  }
`;

export default HeaderContainer;
