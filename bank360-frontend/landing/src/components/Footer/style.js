import styled from "styled-components";

const Wrapper = styled.header`
  padding-top: 80px !important;
  padding-bottom: 20px !important;
  background: white;
  border-bottom: 1px solid #eaeaef;

  p,
  a {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 22px;
    color: #5d6167;
    max-width: 500px;
  }

  @media screen and (min-width: 960px) {
    padding-top: 120px !important;
    padding-bottom: 30px !important;
  }

  @media screen and (min-width: 1200px) {
    padding-top: 160px !important;
    padding-bottom: 40px !important;
  }
  .logo {
    height: auto;
    width: auto;

    @media screen and (min-width: 1200px) {
      height: 64px;
      width: 120px;
      margin-bottom: 6px;
      } 
    }
  }

  section {
  }

  .flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 30px;

    @media screen and (min-width: 960px) {
      margin-bottom: 40px;
    }

    @media screen and (min-width: 1200px) {
      margin-bottom: 60px;
    }

    &__one {
      width: 100%;
      margin-bottom: 32px;

      &-nopad {
        margin-bottom: 16px;
      }

      @media screen and (min-width: 800px) {
        margin-bottom: 0;
        width: 60%;
      }
    }
    &__two {
      display: flex;
      width: 100%;

      & > section {
        &:last-child {
          margin-left: 32px;
          @media screen and (min-width: 800px) {
            margin-left: 56px;
          }
          @media screen and (min-width: 1200px) {
            margin-left: 100px;
          }
        }
      }

      h3 {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 24px;
        color: #151e28;
        margin-bottom: 12px;
        @media screen and (min-width: 1200px) {
          margin-bottom: 24px;
        }
      }

      li {
        list-style: none;
        margin-bottom: 8px;
        @media screen and (min-width: 1200px) {
          margin-bottom: 16px;
        }
      }

      @media screen and (min-width: 800px) {
        justify-content: flex-end;
        width: 40%;
      }

      &-nopad {
        & > * {
          margin-left: 16px;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }

  .menu-btn {
    height: 20px;

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }

  .flex__one {
    min-width: 10rem;
  }

  .flex__two a {
    position: relative;

    &:hover {
      color: var(--text-main);

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -16px;
        width: 10px;
        height: 10px;
        background: var(--theme);
        border-radius: 50%;
      }
    }
  }

  .divider {
    font-weight: 400;
    font-size: 14px;
    line-height: 146%;

    color: #dadae7;
  }
`;

export const FooterStyles = { Wrapper };
