import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background-color: var(--white);
  margin-top: 64px;
  margin-bottom: 64px;

  section {
    background: #fafafa;
    border-radius: 20px;
    padding: 24px;
    position: relative;

    @media screen and (min-width: 720px) {
      padding: 32px;
    }

    @media screen and (min-width: 960px) {
      padding: 40px;
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

  .header {
    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 40px;

      @media screen and (min-width: 600px) {
        margin-bottom: 50px;
      }
      @media screen and (min-width: 960px) {
        margin-bottom: 60px;
      }

      &--right {
        display: none;
        align-items: center;

        &__btn {
          &:first-child {
            margin-right: 30px;
          }
        }

        &__icon {
          height: 24px;

          @media screen and (min-width: 600px) {
            height: 24px;
          }
          @media screen and (min-width: 960px) {
            height: 32px;
          }
        }
      }

      @media screen and (min-width: 600px) {
        /* flex-direction: row; */
        &--right {
          display: flex;
        }
      }
    }
  }
`;

const CardHeaderText = styled.h2`
  font-size: 2.2rem;
  line-height: 2.7rem;
  margin-bottom: 12px;
  font-weight: 700;
  color: #151e28;

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

export const CustomerReviewsStyles = {
  Wrapper,
  CardHeaderText,
  CardSubText,
};
