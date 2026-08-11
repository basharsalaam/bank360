import styled from "styled-components";

export const CheckboxStyle = styled.label`
    cursor: pointer;
    display: block;
    display: flex;
    min-height: 2px;
    align-items: center;
    margin: 0.5em 0;
    & * {
        transition: 1s;
    }

    small {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 24px;
        color: #5a5a5a;
    }
    a {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 24px;
        color: var(--main-blue);
        font-weight: 600;
    }
    /* custom button */
    div.checkbox {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        position: relative;
        margin-right: 4px;
        padding: 5px;
        border: 1px solid #ecf0f3;

        position: relative;
        top: 0;
        left: 0;
        /* height: 25px;
        width: 25px; */
        /* background-color: #eee; */
    }

    /* On hover */
    &:hover {
        div.checkbox {
            border-color: var(--main-blue);
        }
    }
    /* Create the checkbox/indicator (hidden when not checked) */
    .checkbox:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkbox when checked */
    input:checked ~ .checkbox:after {
        display: block;
    }

    input[type="checkbox"] {
        /* Remove default buton */
        display: none;
        &:checked ~ div.checkbox {
            background-color: #67adc8;
            border: none;
            &:after {
                left: 5.4px;
                top: 2.8px;
                width: 3px;
                height: 6px;
                border: solid white;
                border-width: 0 2px 2px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }
    }
`;
