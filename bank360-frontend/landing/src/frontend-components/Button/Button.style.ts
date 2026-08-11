import styled from "styled-components";

export const ButtonStyle = styled.button<{ themeColor?: string }>`
  padding: 8px 14px;
  background-color: ${(props) => props.themeColor || "#67ADC8"};
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  border-radius: 8px;
  transition: 1s;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background: #f6f8fa;
    color: #99a0ae;
    cursor: not-allowed;
  }
`;
