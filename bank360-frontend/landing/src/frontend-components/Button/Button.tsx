import React, { FC } from "react";
import { IButtonProps } from "./Button.interface";
import { ButtonStyle } from "./Button.style";

const Button: FC<IButtonProps> = ({
  themeColor,
  children,
  style,
  className,
  disabled,
  onClick,
}) => {
  return (
    <ButtonStyle
      {...{ themeColor, style, className, disabled }}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
