import styled from "styled-components";

export const ModalContainer = styled.section<{ width?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: white;
  background: #ffffff;
  border: 1px solid #ecf0f3;
  border-radius: 10px;
  width: 430px;
  width: ${(props) => props.width || "430px"};
  max-width: 98%;
`;

export const AddCategoryModal = styled.section`
  .top {
    padding: 24px 32px;
    border-bottom: 1px solid #ecf0f3;

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
`;

export const SuccessModal = styled.section`
  padding: 40px 64px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.rem-pad {
    padding: 0;
  }

  .top {
    border-bottom: 1px solid #ecf0f3;
    padding: 24px 32px;
    border-bottom: 1px solid #ecf0f3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 560px) {
      padding: 24px;
    }
    background-color: white;
  }

  .close-btn {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  h2 {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #151e28;
    margin-top: 24px;
    text-align: center;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    width: 100%;
    @media (max-width: 560px) {
      padding: 24px;
    }
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
      &__danger {
        background: hsla(7, 76%, 54%, 1);
        &:disabled {
          background: #f6f8fa;
          color: #99a0ae;
          cursor: not-allowed;
        }
      }
      &:disabled {
        background: #f6f8fa;
        color: #99a0ae;
        cursor: not-allowed;
      }
    }
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #94a6b3;
    margin-top: 8px;
  }
  .back-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    margin-top: 24px;
    background: #67adc8;
    border-radius: 8px;
    padding: 8px 14px;
  }

  .foot-txt {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #99a0ae;
    margin-top: 16px;
  }

  .click-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #834ec6;
  }
`;
