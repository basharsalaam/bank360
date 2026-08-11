import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: Inter, sans-serif;
    }

    body {
        font-size: 62.5%;
    }

    button {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }


        /* width */
    ::-webkit-scrollbar {
        width: 8px;
        background: #F6F8FA;
        border-radius: 10px;
        height: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        width: 8px;
        background: #F6F8FA;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #E5EBF1;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #CDD9E4;
    }
`;
