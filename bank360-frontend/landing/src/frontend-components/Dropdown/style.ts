import styled from "styled-components";

export const DropdownStyle = styled.section<{ showDropDown: boolean }>`
  position: relative;
  .dropdown {
    opacity: ${(props) => (props.showDropDown ? "1" : 0)};
    display: ${(props) => (props.showDropDown ? "block" : "none")};
    max-height: 240px;
    position: absolute;
    top: 100%;
    z-index: 383;
    left: 0;

    @media (max-width: 1360px) {
      left: -100%;
      right: 0;
    }
  }

  .dropdown-cont {
    overflow: auto;
    background: #ffffff;
    border: 1px solid #ecf0f3;
    box-shadow: 0px 2px 0px #eff1f3;
    border-radius: 10px;
    z-index: 488488;
    padding: 8px;
    width: 130px;

    &__item {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #5d6167;
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border-radius: 8px;

      &:hover {
        background: #f0f9fa;
        font-weight: 700;
        color: #151e28;
      }
    }
  }
`;
