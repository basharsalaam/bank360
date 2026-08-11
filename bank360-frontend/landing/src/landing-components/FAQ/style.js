import styled from "styled-components";

const Wrapper = styled.section`
 
    h2 {
      text-align: center;
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 3.2rem;
      color: #1e1e2f;

      @media screen and (max-width: 640px) {
        margin-top: 10rem;
      }
    }
    
    .faq-category h2{
      text-align: left;
      font-weight: 400;
      font-size: 2.7rem;
      margin-top: 3rem;
      margin-bottom: 0rem;
    }

    .accordion-container {
      margin: 0 auto;
      width: 100%;
      max-width: 770px;
    }
  }

  .contact-us {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 2rem;

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
      font-size: 2rem;
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
