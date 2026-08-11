import styled from "styled-components";

export const SettingsStyle = styled.section`
  .hidden {
    display: none;
  }
  .main main {
    padding: 0;
  }

  .overview {
    display: flex;
    width: 100%;

    &__w55 {
      width: 55%;
      margin-right: 24px;
    }
    &__w50 {
      width: 50%;
      margin-right: 24px;
    }
    &__w35 {
      width: 35%;
    }
    &__w30 {
      width: 30%;
    }

    h4 {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #151e28;
    }

    @media (max-width: 1560px) {
      justify-content: space-between;
      & > * {
        width: 48.5%;
        &:first-child {
          margin-right: 0;
        }
      }
    }

    @media (max-width: 1200px) {
      flex-direction: column-reverse;

      & > * {
        width: 100%;
        &:last-child {
          margin-bottom: 24px;
        }
      }
    }
  }

  .outline-card {
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    padding: 24px;
    margin-bottom: 32px;

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #99a0ae;
      margin-top: 8px;
    }

    @media (max-width: 560px) {
      padding: 16px;
    }

    &__delete {
      &-btn {
        background: hsla(7, 76%, 54%, 1) !important;
      }
      &-header {
        color: hsla(7, 76%, 54%, 1) !important;
      }
    }
  }

  form {
    margin-top: 32px;

    .form-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
    }

    .save-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 72px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #fff;
      padding: 16px;
      background: #67adc8;
      border-radius: 8px;

      @media (max-width: 560px) {
        margin-top: 40px;
      }

      &:hover {
        transform: scale(1.02);
      }

      &:disabled {
        color: #99a0ae;
        background: #f6f8fa;
        cursor: not-allowed;
      }
    }
  }

  .flex {
    display: flex;
    align-items: center;
    margin-top: 24px;

    .avatar-card {
      .avatar-initials,
      .avatar-image {
        height: 72px;
        width: 72px;
      }
    }

    .right {
      width: 100%;
      margin-left: 24px;
    }

    .buttons {
      display: flex;
      width: 100%;
      align-items: center;
    }

    .change-btn {
      background: #67adc8;
      border-radius: 8px;
      padding: 8px 14px;
      color: white;
      margin-right: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;

      &:disabled {
        background: #f6f8fa;
        color: #99a0ae;
        cursor: not-allowed;
      }
    }

    .remove-btn {
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #151e28;
      border: 1px solid #ecf0f3;
      border-radius: 8px;
      padding: 8px 14px;
      cursor: pointer;

      &:disabled {
        color: #99a0ae;
        cursor: not-allowed;
      }
    }

    .avatar-info {
      display: flex;
      align-items: center;
      margin-top: 16px;

      & > * {
        margin: 0 4px;
      }

      p {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #99a0ae;
      }

      .divide {
        width: 2px;
        height: 14px;

        background: #ecf0f3;
      }

      @media (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;

        .divide {
          display: none;
        }
      }
    }

    @media (max-width: 520px) {
      align-items: flex-start;
      .buttons {
        flex-direction: column;
        align-items: flex-start;

        & > * {
          width: 140px;
          text-align: center;

          &:last-child {
            margin-top: 10px;
          }
        }
      }

      .right {
        margin-left: 16px;
      }
    }
  }

  .table-container {
    width: 100%;
    overflow-x: scroll;
  }

  table {
    width: 100%;
    border: 1px solid #ecf0f3;
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
      min-width: 240px;
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
    color: #151e28;
    text-transform: capitalize;
  }

  .date {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #99a0ae;
  }

  .bank-list-container {
    margin-top: 24px;
    border: 1px solid #ecf0f3;
    border-radius: 10px;
    padding: 16px;

    .col.head h4 {
      color: #151e28;
    }

    .bank-col,
    .name-col,
    .col {
      min-width: 160px;
      width: 22%;
    }
    .row.bordered {
      min-width: 880px;
      width: 100%;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 16px;

      p {
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #99a0ae;

        /* @media (max-width: 480px) {
                    font-size: 1.2em;
                } */
      }
      a {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #151e28;
        transition: 1s;

        &:hover {
          transform: scale(1.15);
        }
      }

      @media (max-width: 480px) {
        flex-direction: column;

        p {
          margin-bottom: 16px;
        }
      }
    }

    /* @media (max-widt) */
  }

  .disconnect-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #151e28;
    border: 1px solid #ecf0f3;
    border-radius: 8px;
    padding: 8px 16px;
  }
`;

export const DropdownContainer = styled.section`
  .dropdown-cont {
    background: #ffffff;
    border: 1px solid #ecf0f3;
    /* Menu-shadow */

    box-shadow: 0px 2px 0px #eff1f3;
    border-radius: 10px;
    padding: 8px;
    width: 128px;
    position: absolute;

    &__item {
      font-size: 14px;
      line-height: 22px;
      color: #5d6167;
      transition: 1s;
      font-weight: 400;

      padding: 8px 12px;
      padding-bottom: 8px;
      width: 100%;
      text-align: left;

      &:last-child {
        padding-bottom: 0;
      }

      &:hover {
        color: #151e28;
        font-weight: 700;
        background: #f0f9fa;
        border-radius: 8px;
      }
    }
  }

  @media (max-width: 1560px) {
    .overview {
      display: block;
      & > * {
        width: 48%;
      }
    }
  }
`;
