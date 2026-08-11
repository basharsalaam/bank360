import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background-color: var(--white);
  margin-top: 64px;
  margin-bottom: 64px;

  @media screen {
  }

  section {
    background: #34215c;
    padding: 24px;
    border-radius: 12px;
    color: white;
    position: relative;

    @media screen and (min-width: 720px) {
      padding: 24px;
    }

    @media screen and (min-width: 960px) {
      padding: 32px;
      border-radius: 20px;
    }

    @media screen and (min-width: 1024px) {
      padding: 48px;
    }
    @media screen and (min-width: 1200px) {
      padding: 60px;
      border-radius: 20px;
    }

    .quadrant {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 200px;
      width: 200px;

      @media screen and (min-width: 1024px) {
        height: 300px;
        width: 300px;
      }
    }
  }
`;

const CardHeaderText = styled.h2`
  font-size: 2.2rem;
  line-height: 2.7rem;
  margin-bottom: 12px;
  max-width: 330px;

  @media screen and (min-width: 720px) {
    font-size: 2.8rem;
    line-height: 3.5rem;
  }
  @media screen and (min-width: 1024px) {
    font-size: 3.2rem;
    line-height: 4rem;
  }
`;

const CardSubText = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.1rem;
  opacity: 0.6;
  max-width: 400px;

  @media screen and (min-width: 960px) {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`;

const Form = styled.form`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    background: #442b78;
    border-radius: 8px;
    font-weight: 400;
    font-size: 0.875em;
    line-height: 22px;
    color: #ffffff;
    padding: 12px 16px;

    ::-webkit-input-placeholder {
      color: white;
      opacity: 0.5;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
      opacity: 0.5;
    }

    ::placeholder {
      color: white;
      opacity: 0.5;
    }
  }

  button {
    border-radius: 8px;
    font-weight: 400;
    font-size: 0.875em;
    line-height: 22px;
    color: var(--text-main);
    padding: 12px 16px;
    background: #ffffff;
    font-weight: 600;
    margin-top: 16px;
  }

  @media screen and (min-width: 720px) {
    flex-direction: row;
    input {
      width: 320px;
    }
    button {
      margin-top: 0;
      margin-left: 24px;
    }
  }

  @media screen and (min-width: 1024px) {
    input {
      font-size: 1.6rem;
      padding: 16px;
      width: 400px;
    }
    button {
      font-size: 1.6rem;
    }
  }
`;

export const SubscribeCardStyles = {
  Wrapper,
  CardHeaderText,
  CardSubText,
  Form,
};
