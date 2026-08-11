import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background-color: var(--accent-white);

  section {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    margin: 24px 0;

    @media screen and (min-width: 720px) {
      margin: 48px 0;
      margin-bottom: 24px;
    }

    @media screen and (min-width: 1024px) {
      margin: 72px 0;
      margin-bottom: 24px;
    }
    @media screen and (min-width: 1200px) {
      margin: 96px 0;
      margin-bottom: 24px;
    }
  }
`;

const HeaderText = styled.h1`
  font-size: 2.8rem;
  color: var(--text-main);
  max-width: 500px;
  font-size: 2.4rem;
  line-height: 2.88rem;
  margin: 0 auto;

  @media screen and (min-width: 296px) {
    font-size: 3.2rem;
    line-height: 3.84rem;
  }
  @media screen and (min-width: 800px) {
    font-size: 4rem;
    line-height: 4.8rem;
  }
  @media screen and (min-width: 1024px) {
    font-size: 4.8rem;
    line-height: 5.76rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 5.8rem;
    line-height: 7rem;
  }
`;

const SubHeaderText = styled.p`
  margin-top: 16px;
  color: #757a80;
  max-width: 500px;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.18rem;

  @media screen and (min-width: 1024px) {
    font-size: 1.6rem;
    line-height: 2.5rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 1.8rem;
    line-height: 2.8rem;
  }
`;

const FieldSet = styled.fieldset`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;

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
    background: var(--theme);

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

export const PricingBannerStyles = {
  Wrapper,
  HeaderText,
  SubHeaderText,
  FieldSet,
};
