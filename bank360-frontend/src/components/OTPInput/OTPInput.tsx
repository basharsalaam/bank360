import React, { FC } from "react";
import OtpInput from "react-otp-input";
import { OTP_NUMBER_OF_INPUTS } from "../../utils/constants";
import { IOTPInputProps } from "./OTPInput.interface";
import { OTPInputStyle } from "./OTPInput.style";

const OTPInput: FC<IOTPInputProps> = ({ placeholder, handleChange, value }) => {
    return (
        <OTPInputStyle>
            <OtpInput
                value={value}
                onChange={handleChange}
                numInputs={OTP_NUMBER_OF_INPUTS}
                // separator={<span>-</span>}
                containerStyle={"otp-container"}
                inputStyle={"otp-input"}
                isInputNum={true}
                isInputSecure={true}
            />
        </OTPInputStyle>
    );
};

export default OTPInput;
