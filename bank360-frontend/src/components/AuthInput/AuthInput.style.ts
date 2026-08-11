import styled from "styled-components";

export const AuthInputStyle = styled.label`
    margin-bottom: 16px;
    display: block;
    position: relative;

    .input-container {
        width: 100%;
        position: relative;

        .flag-dropdown.open {
            border-radius: 8px 0 0 8px;
        }
        .country-list {
            background-color: red;
            background: #ffffff;
            border: 1px solid #ecf0f3;
            box-sizing: border-box;
            /* Menu-shadow */

            box-shadow: 0px 2px 0px #eff1f3;
            border-radius: 10px;
            padding: 8px;

            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            /* identical to box height, or 157% */

            color: #5d6167;
            margin: 28px 0 10px -16px;

            /* width */
            ::-webkit-scrollbar {
                width: 8px;
                background: #f6f8fa;
                border-radius: 10px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                width: 8px;
                background: #f6f8fa;
                border-radius: 10px;
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #e5ebf1;
                border-radius: 10px;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #555;
            }

            .country {
                padding: 8px 12px;
                margin-bottom: 8px;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                color: #5d6167;
                border-radius: 8px;

                &:hover,
                &.highlight {
                    background: #f0f9fa;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 22px;
                    color: #151e28;
                }
            }
        }
    }

    .eye {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    input,
    .input-container .phone-input {
        width: 100%;
        font-weight: 400;
        font-size: 1.6em;
        line-height: 24px;
        color: #4e525a;
        padding: 12px 16px;
        background: #ffffff;
        border: 1px solid #ecf0f3;
        border-radius: 8px;
        outline: none;
        transition: 1s;

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

    .input-container .phone-input {
        padding-left: 86px;
        height: auto;
        font-size: 16px;
        color: #4e525a;
        letter-spacing: unset;
    }

    .input-container .phone-input-btn {
        background: #f6f8fa;
        border: 1px solid #ecf0f3;
        padding: 16px;
        border-radius: 8px 0 0 8px;

        .selected-flag {
            background: transparent;
        }
    }

    .error {
        margin-top: 8px;
        font-size: 1.2em;
        font-weight: 500;
        color: #e3452f;
    }

    .underlink {
        font-weight: 700;
        font-size: 1.4em;
        line-height: 20px;
        color: #834ec6;
        margin-top: 10px;
        display: block;
    }
`;

// First Name
// Last Name
// email
// Phone Number
// Organisation Name
// Password
