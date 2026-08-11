import styled from "styled-components";

export const FinancialTrendsStyle = styled.section`
    .main main {
        padding: 0;
    }

    .balance {
        display: flex;
        align-items: center;

        h4 {
            margin-right: 16px;
        }
        span {
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            /* identical to box height, or 150% */

            text-align: right;
            border-radius: 4px;
            padding: 4px 8px;

            &.gain {
                background: #e0fae6;
                color: #627f6f;
            }

            &.loss {
                color: #e3452f;
                background: rgba(227, 69, 47, 0.1);
            }
        }
    }

    .stat {
        background: #ffffff;
        border: 1px solid #ecf0f3;
        border-radius: 10px;
        display: flex;
        align-items: center;

        .half {
            display: flex;
            width: 50%;
            padding: 16px 24px;
            justify-content: space-between;

            aside {
                display: flex;
                align-items: center;

                span {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 18px;
                    /* identical to box height, or 150% */

                    text-align: right;
                    border-radius: 4px;
                    padding: 4px 8px;

                    &.gain {
                        background: #e0fae6;
                        color: #627f6f;
                    }

                    &.loss {
                        color: #e3452f;
                        background: rgba(227, 69, 47, 0.1);
                    }
                }
            }

            h6 {
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
                color: #151e28;
                margin-right: 10px;
            }

            &.left {
                border-right: 1px solid #ecf0f3;
            }

            .date {
                font-weight: 500;
                font-size: 13px;
                line-height: 22px;
                color: #99a0ae;

                b {
                    font-weight: 600;
                    color: #151e28;
                }
            }
        }
    }
    .transactions-table {
        margin-top: 24px;
    }

    .graph {
        margin-top: 24px;
        background: #ffffff;
        border: 1px solid #ecf0f3;
        border-radius: 10px;
        padding: 24px 0;

        header {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding: 0 24px;
        }

        main {
            padding: 0;
        }

        &-title {
            font-weight: 700;
            font-size: 14px;
            line-height: 22px;
            color: #151e28;
        }

        &-labels {
            display: flex;
            align-items: center;

            > div {
                display: flex;
                align-items: center;
                &:first-child {
                    margin-right: 24px;
                }

                p {
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 22px;
                    color: #151e28;
                }

                span {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-right: 10px;

                    &.blue {
                        background: #1e85ff;
                    }

                    &.red {
                        background: #e3452f;
                    }
                }
            }
            @media (max-width: 480px) {
                > div {
                    &:first-child {
                        margin-right: 16px;
                    }
                    p {
                        font-size: 12px;
                    }
                }
            }
        }
    }

    @media (max-width: 1300px) {
        .header-flex {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            .right {
                margin-left: 0;
                margin-top: 12px;

                & > * {
                    max-width: 100%;
                    &:first-child {
                        margin-left: 0;
                    }
                }
            }
        }
    }
    .panel {
        padding: 0;
    }
    .tab-content {
        padding: 32px;
    }

    @media (max-width: 1024px) {
        .stat {
            .half {
                flex-direction: column;
                align-items: center;

                aside {
                    flex-direction: column;
                    h6 {
                        margin-bottom: 8px;
                    }
                }

                .date {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 12px;
                    line-height: 18px;
                }
            }
        }
    }

    @media (max-width: 800px) {
        .tab-content {
            padding: 24px calc(0.035 * 100vw);
        }
        .header-flex {
            .right {
                flex-direction: column;
                width: 100%;

                & > * {
                    width: 100%;
                    max-width: 100% !important;
                    margin: 0;
                    margin-bottom: 12px;
                    margin-left: 0 !important;
                }
            }
        }
        .MuiTabs-flexContainer {
            padding: 12px calc(0.035 * 100vw) 0 calc(0.035 * 100vw);
        }
    }

    @media (max-width: 480px) {
        .stat {
            flex-direction: column;

            .half {
                width: 100%;
                &.left {
                    border-right: none;
                    border-bottom: 1px solid #ecf0f3;
                }
            }
        }
    }
`;
