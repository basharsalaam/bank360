import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 48px;
  padding-bottom: 48px;
  background-color: white;

  @media screen and (min-width: 960px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }

  @media screen and (min-width: 960px) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  section {
    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 3.2rem;
      color: #1e1e2f;
      margin-bottom: 40px;

      @media screen and (min-width: 960px) {
        font-size: 2.8rem;
        line-height: 3.6rem;
      }
      @media screen and (min-width: 1200px) {
        font-size: 3.2rem;
        line-height: 4rem;
      }
    }

    .accordion-container {
      margin: 0 auto;
      width: 100%;
      max-width: 770px;
    }
  }

  .avatar-grp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;

    h4 {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2.8rem;
      color: #151e28;

      @media screen and (min-width: 960px) {
        line-height: 3.2rem;
      }
    }

    img {
      height: 40px;
      margin-bottom: 8px;

      @media screen and (min-width: 960px) {
        height: 56px;
        margin-bottom: 16px;
      }
    }

    a {
      font-weight: 600;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      line-height: 24px;
      color: #1f87ff;

      span {
        display: flex;
        margin-left: 8px;
      }
    }
  }
`;

export const FAQStyles = {
  Wrapper,
};
