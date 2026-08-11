import styled from "styled-components";

export const BarAndLineStyle = styled.section`
    @media (max-width: 1024px) {
        overflow-x: scroll;
        overflow-y: hidden;
        padding-top: 24px;
    }

    & > div {
        /* width: 960px !important; */

        @media (max-width: 1024px) {
            min-width: 960px !important;
        }
    }

    h5 {
        font-weight: 700;
        font-size: 15px;
        line-height: 22px;
        margin-bottom: 8px;
        color: #151e28;
    }
    h6 {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #99a0ae;
    }

    /* chart tooltip */
    .tool-tip {
        background: #fff;
        border: 1px solid #e1e1eb;
        border-radius: 6px;
        padding: 16px;
        position: relative;
        z-index: 37373;

        &::after {
            position: absolute;
            width: 32px;
            height: 24px;
            left: 56px;
            top: 110px;
            background: #fafafa;
            transform: rotate(180deg);
        }

        &-flex {
            display: flex;
            justify-content: space-between;

            svg {
                height: 14px;
                width: 14px;
            }

            &-left {
                margin-right: 40px;
            }

            &-top {
                display: flex;
                align-items: center;
                margin-bottom: 8px;

                small {
                    font-weight: 500;
                    font-size: 10px;
                    line-height: 12px;
                    margin-left: 4px;
                    color: #99a0ae;
                }
            }

            h5 {
                font-weight: 700;
                font-size: 14px;
                line-height: 22px;
                color: #151e28;
                margin-bottom: 8px;
            }

            .rise {
                font-weight: 500;
                font-size: 10px;
                line-height: 12px;
                color: #54b773;
            }

            span {
                font-weight: 500;
                font-size: 12px !important;
                line-height: 15px;
                color: #99a0ae;
            }
        }
    }

    .apexcharts-text tspan {
        color: red;
    }
`;
