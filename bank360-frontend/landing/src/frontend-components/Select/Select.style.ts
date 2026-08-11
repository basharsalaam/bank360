import styled from "styled-components";

export const SelectStyle = styled.button<{
  width?: string;
  minWidth?: string;
  showDropDown?: boolean;
  multiple?: boolean;
}>`
  background: #ffffff;
  border: 1px solid #ecf0f3;
  border-radius: 8px;
  padding: ${(props) => (props.multiple ? "4px 4px" : "8px 14px")};
  width: ${(props) => props.width || "100%"};
  justify-content: center;
  
  align-items: center;
  position: relative;
  /* min-width: 224px; */
  min-width: ${(props) => props.minWidth || "224px"};

  .displayed {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  label {
    display: flex;
    flex-direction: row;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #151e28;
    cursor: pointer;
    text-transform: capitalize;
  }

  svg {
    height: 20px;
    width: 20px;
  }

  .selected-label {
    font-weight: 500;
    font-size: 12px;
    padding: 4px 8px;
    line-height: 20px;
    margin-right: 4px;
    color: #151e28;
    background: #f6f8fa;
    border-radius: 4px;

    &.add {
      color: #67adc8;
      font-weight: 600;
    }
  }

  /* the dropdown */
  .dropdown {
    position: absolute;
    top: 100%;
    background-color: red;
    right: 0;
    margin-top: 8px;
    background: #ffffff;
    border: 1px solid #ecf0f3;
    box-shadow: 0px 2px 0px #eff1f3;
    border-radius: 10px;
    padding: 8px;
    z-index: 88888888;
    min-width: 100%;
    display: ${(props) => (props.showDropDown ? "block" : "none")};
    max-height: 240px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 2px;
    }

    .input-group {
      width: 100%;
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1px solid #ecf0f3;
      border-radius: 8px;
      padding: 8px 14px;
      margin-bottom: 8px;

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

    .dropdown__item {
      padding: 8px 12px;
      margin-bottom: 8px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #5d6167;
      min-width: 100%;
      display: flex;
      border-radius: 8px;
      justify-content: flex-start;
      align-items: center;
      padding-right: 60px;
      white-space: pre;

      &:last-child {
        margin-bottom: 0;
      }

      text-transform: capitalize;
      &:hover {
        background-color: #eff7f8;
      }

      &.selected {
        background: #f0f9fa;
        font-weight: 700;
        color: #151e28;
      }

      .check {
        margin-right: 10px;
      }
    }
  }

  &.left {
    .dropdown {
      left: 0;
      right: auto;
    }
  }
`;
