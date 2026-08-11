import styled from "styled-components";
export const SettingsHeaderContainer = styled.section`
    .header-flex {
        justify-content: space-between;
        /* margin-top: 24px; */
        align-items: center;

        .f-trend {
            max-width: 190px;
            min-width: 180px;
            margin-left: 16px;
        }

        & > * {
            display: flex;
            align-items: center;
        }
    }

    .show-1400 {
        display: none;
    }
    header.dashboard-header {
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;

        .dashboard-header__title {
            margin-bottom: 0;
        }

        .header-flex {
            margin-top: 0;
            width: auto;
        }

        @media (max-width: 1400px) {
            flex-direction: column;
            align-items: flex-start;
            .dashboard-header__first {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
            }

            .show-1400 {
                display: block;
                align-self: center;
            }
            & > * {
                width: 100%;
            }

            .hide-1400 {
                display: none;
            }

            .header-flex {
                margin-top: 24px;
                width: 100%;

                & > * {
                    &:first-child {
                        margin-left: 0;
                    }
                }
                .divider {
                    display: none;
                }
            }

            .right {
                width: 100%;
                & > * {
                    width: 100%;
                }
            }
        }

        @media (max-width: 640px) {
            .right {
                flex-direction: column;

                & > * {
                    max-width: none;
                    width: 100%;
                    margin-left: 0;
                    margin-bottom: 12px;
                }
            }
        }
    }

    .input-group {
        margin: 0;
        width: 100%;
        display: flex;
        align-items: center;
        background: #ffffff;
        border: 1px solid #ecf0f3;
        border-radius: 8px;
        padding: 8px 14px;

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

    .export-btn {
        font-size: 14px;
        margin-left: 16px;
        min-width: 108px;
    }
    .divider {
    }

    .right > * {
        margin-left: 16px;
    }
`;
