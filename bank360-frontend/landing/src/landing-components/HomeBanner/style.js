import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 8px !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  margin: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  .bottom-text {
    margin-top: 1rem;
    margin-bottom: -1rem;

const FieldSet = styled.fieldset
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  
  a {
    text-decoration: none;

    @media screen and (max-width: 820px) {
      margin: 0px auto;
    }
  }

  button {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 21px;
    padding: 12px 18px;
    border-radius: 8px;
    width: 100%;
  }

  .register-btn {
    color: var(--main-white);
    background: var(--button-bg, #01a0c6);
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 1.2;
    padding: 20px 30px;
    border-radius: 3.5rem;
    margin: 1rem auto;
    width: max-content;
    text-align: center;
    transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--theme-hover);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid var(--theme-hover);
    outline-offset: 4px;
  }

  @media screen and (max-width: 1200px) {
    padding: 18px 26px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 1000px) {
    padding: 16px 24px;
  }

  @media screen and (max-width: 900px) {
    padding: 14px 20px;
    font-size: 1.4rem;
    border-radius: 4rem;
  }

  @media screen and (max-width: 260px) {
    padding: 5px 1px;
    font-size: 0.6rem;
    border-radius: 2rem;
    width: 50px;
  }
    }
}


  .login-btn {
    color: var(--main-white);
    background: var(--theme);
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 21px;
    padding: 12px 18px;
    border-radius: 8px;

    &:hover {
      background-color: var(--theme-hover);
    }
  }

  .contact-btn {
    color: var(--text-main);
    border: 1px solid #dadae7;
    margin-top: 16px;

    &:hover {
      border-color: var(--text-main);
    }
  }

  @media screen and (min-width: 420px) {
    flex-direction: row;

    button {
      width: auto;
    }

    .contact-btn {
      margin-top: 0;
      margin-left: 16px;
    }
  }
`;

export const HomeBannerStyles = {
  Wrapper
};