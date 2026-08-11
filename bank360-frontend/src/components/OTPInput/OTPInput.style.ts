import styled from "styled-components";

export const OTPInputStyle = styled.label`
    .otp-input {
        width: 64px !important;
        height: 64px;
        font-weight: 400;
        font-size: 3em;
        line-height: 24px;
        color: #4e525a;
        padding: 16px;
        background: #ffffff;
        border: 1px solid #ecf0f3;
        border-radius: 8px;
        outline: none;
        transition: 1s;
        margin: 0 8px;
        font-weight: 600;

        &:focus {
            border-color: #34215c;
            color: #34215c;
            font-weight: 500;
        }

        ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
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

        /* @media (max-width: 480px) {
            fo
        } */
    }

    .error {
        margin-top: 8px;
        font-size: 1.2em;
        font-weight: 500;
        color: #e3452f;
    }

    .otp-container {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }
`;

// First Name
// Last Name
// email
// Phone Number
// Organisation Name
// Password
