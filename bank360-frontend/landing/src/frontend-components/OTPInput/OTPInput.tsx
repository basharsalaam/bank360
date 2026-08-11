import React, { FC } from "react";
import { OTP_NUMBER_OF_INPUTS } from "../../utils/constants";
import { IOTPInputProps } from "./OTPInput.interface";

const OTPInput: FC<IOTPInputProps> = ({ placeholder, handleChange, value }) => {
    const inputs = Array.from({ length: OTP_NUMBER_OF_INPUTS }, (_, index) => index);

    return (
        <div className="flex justify-center space-x-5">
            {inputs.map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    placeholder={placeholder}
                    value={value[index] || ""}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        handleChange(newValue, index); // Pass both value and index
                    }}
                    className="w-12 h-20 mx-4 text-center border-4 border-gray-300 rounded ring-2 ring-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
            ))}
        </div>
    );
};

export default OTPInput;