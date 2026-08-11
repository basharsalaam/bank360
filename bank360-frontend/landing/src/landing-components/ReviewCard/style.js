import styled from "styled-components";

export const ReviewCardContainer = styled.article`
  background: #ffffff;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  width: calc(100vw - 140px);
  max-width: 90%;
  padding: 20px;
  margin-right: 30px;

  @media screen and (min-width: 400px) {
    width: 470px;
  }

  @media screen and (min-width: 800px) {
    padding: 24px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }

  .review {
    &__text {
      margin-bottom: 40px;
      font-weight: 400;
      font-size: 18px;
      line-height: 150%;
      color: #151e28;
      max-width: 94%;

      font-size: 14px;

      @media screen and (min-width: 800px) {
        font-size: 15px;
      }
      @media screen and (min-width: 960px) {
        font-size: 16px;
      }
      @media screen and (min-width: 1024px) {
        font-size: 17px;
      }
      @media screen and (min-width: 1200px) {
        font-size: 18px;
      }
    }

    &__author {
      &--name {
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        color: #151e28;
      }
      &--role {
        font-weight: 400;
        font-size: 12px;
        line-height: 150%;
        color: #5d6167;
      }
      &--avatar {
        height: 32px;
        width: 32px;
        margin-right: 16px;
      }

      @media screen and (min-width: 800px) {
        &--name {
          font-size: 15px;
        }
        &--role {
          font-size: 13px;
        }
        &--avatar {
          height: 36px;
          width: 36px;
        }
      }
      @media screen and (min-width: 960px) {
        &--name {
          font-size: 16px;
        }
        &--role {
          font-size: 14px;
        }
        &--avatar {
          height: 42px;
          width: 42px;
        }
      }
      @media screen and (min-width: 1024px) {
        &--name {
          font-size: 18px;
        }
        &--role {
          font-size: 15px;
        }
        &--avatar {
          height: 46px;
          width: 46px;
        }
      }
      @media screen and (min-width: 1200px) {
        &--name {
          font-size: 20px;
        }
        &--role {
          font-size: 16px;
        }
        &--avatar {
          height: 50px;
          width: 50px;
        }
      }
    }

    &__footer {
      display: flex;
      align-items: center;
    }
  }
`;
