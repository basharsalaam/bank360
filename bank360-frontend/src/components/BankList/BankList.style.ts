import styled from "styled-components";

export const BankListStyle = styled.section`
    width: 100%;

    p.none {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #99a0ae;
        text-align: center;
    }
    overflow-x: scroll;
    .row {
        display: flex;
        margin-bottom: 16px;
        align-items: flex-end;
        padding: 0px 16px;

        &.bordered {
            background: #ffffff;
            border: 1px solid #ecf0f3;
            border-radius: 10px;
            padding: 24px 16px;
            width: 1020px;
            margin-right: 5px;
            align-items: center;

            h4 {
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
                color: #151e28;
            }
        }
    }
    .col {
        width: 150px;
        margin-right: 54px;
        flex-shrink: 0;
        display: flex;
        align-items: center;

        &.head {
            h4 {
                font-weight: 500;
                font-size: 14px;
                line-height: 22px;
                color: #99a0ae;
            }
        }
        &.start {
            align-items: flex-start;

            .show-btn {
                margin-left: 8px;
            }
        }
        .refresh-btn {
            /* padding: 4px; */
            background: #f3f3f5;
            border-radius: 6px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            min-width: 24px;
            min-height: 24px;
            svg {
                height: 16px;
                width: 16px;
                min-width: 16px;
                min-height: 16px;
            }
        }

        .success {
            color: #54b773;
        }

        .failure {
            color: #e3452f;
        }

        .as-at {
            font-weight: 400;
            font-size: 10px;
            line-height: 12px;
            color: #99a0ae;
            margin-top: 4px;
            text-align: center;
        }
    }

    .copy-btn {
        transition: 1s;
        svg {
            margin-left: 10px;
        }

        &:hover {
            transform: scale(1.15);
        }
    }

    .bank-icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        width: 28px;
        background: #f6f8fa;
        margin-right: 8px;
        border-radius: 50%;
        min-width: 28px;
        min-height: 28px;
    }
    .bank-icon {
        height: 14px;
        min-height: 14px;
        min-width: 14px;
    }

    .bank-col {
        width: 160px;
    }

    .name-col {
        width: 170px;
    }

    .alert {
        background: #ffffff;
        border: 1px solid #ecf0f3;
        box-sizing: border-box;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
        position: absolute;
        bottom: 130%;
        right: 0;
        border-radius: 10px;
        padding: 12px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }

    .copyyy {
        position: relative;
    }
`;
