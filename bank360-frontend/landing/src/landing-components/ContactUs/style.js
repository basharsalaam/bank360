import styled from "styled-components";

const ContactUs = styled.div`
    .container {
        min-height: 100vh;
        margin-top: 3rem;
        padding: 1rem;
        background-color: #fafafa;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        }

        .form {
        width: 100%;
        max-width: 1020px;
        background-color: #fff;
        border-radius: 3rem;
        box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0rem;
        }

        .contact-form {
        background-color: #34215C;
        position: relative;
        }

        form {
        padding: 2.3rem 2.2rem;
        z-index: 10;
        overflow: hidden;
        position: relative;
        }

        .title {
        color: #fff;
        font-weight: 500;
        font-size: 3.5rem;
        line-height: 1;
        margin-bottom: 0.7rem;
        }

        .input-container {
        position: relative;
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        }

        .input {
        width: 100%;
        outline: none;
        border: 2px solid #fafafa;
        background: none;
        padding: 0.6rem 0rem;
        color: #fff;
        font-weight: 500;
        font-size: 2rem;
        letter-spacing: 0.5px;
        border-radius: 5px;
        transition: 0.3s;
        }

        textarea.input {
        padding: 0.8rem 0rem;
        min-height: 150px;
        border-radius: 5px;
        resize: none;
        overflow-y: auto;
        }

        .input-container label {
        transform: translateY(-50%);
        padding: 0 0.4rem;
        color: #fafafa;
        font-size: 1.3rem;
        font-weight: 400;
        }

        .input-container.textarea label {
        top: 1rem;
        transform: translateY(0);
        }

        .btn {
        padding: 0.6rem 1.3rem;
        background-color: #fff;
        border: 2px solid #fafafa;
        font-size: 1.5rem;
        color: #000000;
        line-height: 1;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        transition: 0.3s;
        margin: 0;
        min-width: 100%;
        }

        .btn:hover {
        background-color: transparent;
        color: #fff;
        }

        .input-container span {
        position: absolute;
        top: 0;
        left: 25px;
        transform: translateY(-50%);
        font-size: 0.8rem;
        padding: 0 0.4rem;
        color: transparent;
        pointer-events: none;
        z-index: 500;
        }

        .input-container span:before,
        .input-container span:after {
        content: "";
        position: absolute;
        width: 10%;
        opacity: 0;
        transition: 0.3s;
        height: 5px;
        top: 50%;
        transform: translateY(-50%);
        }

        .input-container span:before {
        left: 50%;
        }

        .input-container span:after {
        right: 50%;
        }


        .contact-info {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        }

        .contact-info .title {
        color: #01A0C6;
        }

        .text {
        color: #333;
        margin: 1.5rem 0 2rem 0;
        }

        .information {
        display: flex;
        color: #555;
        margin: 0.7rem 0;
        align-items: center;
        font-size: 1.5rem;
        }

        .information i {
        color: #34215C;
        margin-right: 1rem;
        }

        .social-media {
        padding: 2rem 0 0 0;
        }

        .social-media p {
        color: #333;
        }

        .social-icons {
        display: flex;
        margin-top: 0.5rem;
        font-size: 1.5rem;
        }

        .social-icons a {
        border-radius: 5rem;
        color: #fff;
        text-align: center;
        line-height: 35px;
        margin-right: 0.5rem;
        transition: 0.3s;
        }

        .social-icons a:hover {
        transform: scale(1.05);
        }


        @media (max-width: 850px) {
        .form {
            margin-top: 10rem;
            grid-template-columns: 1fr;
        }

        .contact-info:before {
            bottom: initial;
            top: -75px;
            right: 65px;
            transform: scale(0.95);
        }

        .contact-form:before {
            top: -13px;
            left: initial;
            right: 70px;
        }

        .square {
            transform: translate(140%, 43%);
            height: 350px;
        }

        .big-circle {
            bottom: 75%;
            transform: scale(0.9) translate(-40%, 30%);
            right: 50%;
        }

        .text {
            margin: 1rem 0 1.5rem 0;
        }

        .social-media {
            padding: 1.5rem 0 0 0;
        }
        }

        @media (max-width: 480px) {
        .container {
            padding: 1.5rem;
        }

        .contact-info:before {
            display: none;
        }

        .square,
        .big-circle {
            display: none;
        }

        form,
        .contact-info {
            padding: 1.7rem 1.6rem;
        }

        .text,
        .information,
        .social-media p {
            font-size: 1.5rem;
        }

        .title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }

        .social-icons a {
            width: 30px;
            height: 30px;
            line-height: 30px;
        }

        .icon {
            width: 23px;
        }

        .input {
            padding: 0.45rem 0rem;
            padding-left: 0.4rem;
            max-width: 330px;
        }

        .btn {
            padding: 0.45rem 1.2rem;
        }
    }
`;

export const ContactStyles = { ContactUs };