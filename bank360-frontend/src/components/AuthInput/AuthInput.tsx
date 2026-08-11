import React, { FC, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons";
import "react-phone-input-2/lib/style.css";

import {
  PASSWORD_STRENGTH_BAR_COLORS,
  PASSWORD_STRENGTH_SCORE_WORDS,
} from "../../utils/constants";
import { IAuthInputProps } from "./AuthInput.interface";
import { AuthInputStyle } from "./AuthInput.style";
import PhoneInput from "react-phone-input-2";

const AuthInput: FC<IAuthInputProps> = ({
  placeholder,
  type,
  keyValue,
  formik,
  underLink,
  showPasswordStrength,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  return (
    <AuthInputStyle>
      <div className="input-container">
        {type !== "tel" && (
          <input
            id={keyValue}
            name={keyValue}
            type={
              type === "password" ? (passwordShown ? "text" : "password") : type
            }
            value={formik.values[keyValue]}
            placeholder={placeholder}
            onChange={formik.handleChange}
          />
        )}
        {type === "tel" && (
          <PhoneInput
            country={"ng"}
            value={formik.values[keyValue]}
            onChange={(phone) => formik.setFieldValue(keyValue, phone)}
            placeholder={placeholder}
            inputClass="phone-input"
            buttonClass="phone-input-btn"
            autoFormat={false}
          />
        )}
        {type === "password" && (
          <button
            className="eye"
            onClick={() => {
              setPasswordShown((prev) => !prev);
            }}
            type="button"
          >
            {!passwordShown ? <Icons.EyeOpenIcon /> : <Icons.EyeCloseIcon />}
          </button>
        )}
      </div>

      {/* {showPasswordStrength && (
        <PasswordStrengthBar
          password={formik.values[keyValue]}
          barColors={PASSWORD_STRENGTH_BAR_COLORS}
          scoreWords={PASSWORD_STRENGTH_SCORE_WORDS}
          minLength={8}
        />
      )} */}

      {formik.errors[keyValue] && formik.touched[keyValue] && (
        <small className="error">{formik.errors[keyValue]}</small>
      )}

      {/* {underLink?.text && (
        <Link to={underLink.link} className="underlink">
          {underLink.text}
        </Link>
      )} */}
    </AuthInputStyle>
  );
};

export default AuthInput;

// /(?=^(?:[^A-Z]*[A-Z]))(?=^(?:[^a-z]*[a-z]))(?=^(?:\D*\d))(?=^(?:\w*\W))^[A-Za-z\d\W]{8,}$/;
