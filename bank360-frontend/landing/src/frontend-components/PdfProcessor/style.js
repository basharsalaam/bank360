import styled from "styled-components";

export const PdfProcessorContainer = styled.section`
  .scroll {
    overflow-x: scroll;
  }
  h2 {
    margin-top: 1rem;
  }
  .pdf {
    &__view {
      max-height: 400px;
      overflow-y: scroll;

      &-flex {
        display: flex;
        align-items: center;
      }
    }
  }

  .top {
    padding: 24px 32px;
    border-bottom: 1px solid #ecf0f3;
    min-width: 880px;

    @media (max-width: 560px) {
      padding: 24px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    @media (max-width: 560px) {
      padding: 24px;
    }
    width: 100%;
  }
  button {
    padding: 8px 14px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    border-radius: 8px;

    &.outline-btn {
      color: #151e28;
      border: 1px solid #ecf0f3;
      &:disabled {
        color: #99a0ae;
        cursor: not-allowed;
      }
    }

    &.filled-btn {
      background: #67adc8;
      color: white;
      &:disabled {
        background: #f6f8fa;
        color: #99a0ae;
        cursor: not-allowed;
      }
    }
  }
  text-align: center;
  h2 {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #151e28;
  }

  input {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #151e28;
    display: block;
    width: 100%;
    margin-top: 24px;
    border: 1px solid #ecf0f3;
    border-radius: 8px;
    padding: 16px;
    outline: none;
    transition: 1s;

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

  .content {
    h3 {
      font-size: 24px;
    }
  }
`;
