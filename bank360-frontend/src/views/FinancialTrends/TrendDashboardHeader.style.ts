import styled from "styled-components";
export const TrendDashboardHeaderContainer = styled.section`
    .dashboard-header {
        display: flex;

        @media (max-width: 1400px) {
            display: block;
        }
    }
    .input-group {
        width: 100%;
    }

    .header-flex {
        justify-content: space-between;
        margin-top: 24px;
        align-items: center;
        justify-content: flex-end;
        /* width: 100%; */

        .f-trend {
            max-width: 240px;
            min-width: 220px;
            margin-left: 16px;
        }

        & > * {
            display: flex;
            align-items: center;
        }
    }

    &.just-search .header-flex {
        width: 100%;
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

    @media (max-width: 1400px) {
        .right {
            width: 100%;

            & > * {
                max-width: 100% !important;
                width: 100% !important;
            }
        }
    }
`;
