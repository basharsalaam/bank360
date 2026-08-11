import styled from "styled-components";

export const HomeStyle = styled.section`
  .dashboard-main {
    display: flex;
    justify-content: flex-start;

    .flex {
      display: flex;
    }

    .left {
      width: 30%;
      width: calc(100% - 334px);
      padding: 16px;
      background: #ffffff;
      border: 1px solid #ecf0f3;
      border-radius: 10px;
      margin-right: 24px;

      &-header {
        align-items: center;
        justify-content: space-between;
        h4 {
          font-weight: 700;
          font-size: 1.4em;
          line-height: 22px;
          color: #151e28;
        }

        .convert-value {
          background: #f1f5fd;
          border-radius: 8px;
          padding: 8px;
          font-weight: 500;
          font-size: 1.2em;
          line-height: 20px;
          color: #151e28;
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 16px;
        }
      }
    }

    .right {
      width: 310px;
      max-width: 100%;
    }

    .card {
      width: 100%;
      padding: 40px;
      border: 1px solid #ecf0f3;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .abs-top {
        position: absolute;
        top: 0;
        right: 0;
      }

      .abs-btm {
        position: absolute;
        bottom: 0;
        left: 0;
        transform: rotate(180deg);
      }

      &.bottom {
        margin-top: 24px;
      }

      &.news {
        padding: 0;
        align-items: flex-start !important;
      }

      h3 {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #151e28;
        /* margin-top: 24px; */
      }

      .highlighted {
        color: #99a0ae;
        padding: 4px 12px;
        background: #f6f8fa;
        border-radius: 6px;
        font-weight: 500;
        font-size: 1.4em;
        line-height: 22px;
        margin-top: 16px;
      }

      small {
        font-weight: 400;
        font-size: 1.2em;
        line-height: 20px;
        text-align: center;
        color: #94a6b3;
        margin-top: 12px;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        color: #99a0ae;
        margin-top: 16px;
      }

      .learn-more-btn {
        padding: 8px 14px;
        border: 1px solid #ecf0f3;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #151e28;
        margin-top: 24px;
      }

      .carousel {
        display: flex;
        margin-top: 32px;

        & > div {
          width: 20px;
          height: 3px;
          background: #ecf0f3;
          margin: 0 2px;

          &.selected {
            background-color: #67adc8;
          }
        }
      }
    }

    @media (max-width: 950px) {
      flex-wrap: wrap;

      .left {
        width: 100%;
        margin-bottom: 24px;
      }

      .right {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;

        .card {
          @media (max-width: 950px) {
            width: 48%;

            &.bottom {
              margin-top: 0;
              transition-duration: 0.1s;
            }
          }

          @media (max-width: 520px) {
            width: 100%;
            &.bottom {
              margin-top: 24px;
            }
          }
        }
      }
    }
  }

  .display-amount {
    background: #f1f5fd;
    border-radius: 10px;
    padding: 16px;
    margin-top: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .abs {
      position: absolute;
      bottom: 18px;
      right: 16px;
      display: flex;
      align-items: center;
      figure {
        background: #ffffff;
        padding: 4px;
        border-radius: 50%;
        box-shadow: 0px 2px 0px #eff1f3;
        margin-right: 10px;
      }
      h3 {
        font-weight: 600;
        font-size: 1.2em;
        line-height: 20px;
        color: #34215c;
      }
    }

    @media (max-width: 600px) {
      padding-bottom: 56px;
    }

    p {
      font-weight: 500;
      font-size: 1.2em;
      line-height: 20px;
      color: #99a0ae;
      margin-bottom: 8px;
    }

    &__value {
      display: flex;
      align-items: center;
      h2 {
        font-size: 2.8em;
        line-height: 40px;
        color: #151e28;
        font-weight: 700;
        margin-right: 8px;
      }

      /* .show-btn {
                background: #e4ebf1;
                border-radius: 6px;
                padding: 4px;
                svg {
                    height: 14px;
                }
            } */
    }
  }

  .bank-list-container {
    margin-top: 24px;

    .flex {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      align-items: center;
      flex-wrap: wrap;

      p {
        font-weight: 500;
        font-size: 1.4em;
        line-height: 22px;
        color: #99a0ae;

        /* @media (max-width: 480px) {
                    font-size: 1.2em;
                } */
      }
      a {
        font-weight: 600;
        font-size: 1.4em;
        line-height: 22px;
        color: #151e28;
        transition: 1s;

        &:hover {
          transform: scale(1.15);
        }
      }

      @media (max-width: 480px) {
        flex-direction: column;

        p {
          margin-bottom: 16px;
        }
      }
    }
  }

  .show-btn {
    background: #e4ebf1;
    border-radius: 6px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 4px; */
    svg {
      height: 14px;
    }
  }

  @media (max-width: 1300px) and (min-width: 935px) {
    .dashboard-main {
      .flex {
        /* overflow-x: hidden; */
        width: 100%;
        justify-content: space-between;
        margin-top: 16px;

        .bank-select {
          min-width: 60%;
          width: 66%;
        }
      }

      section.flex {
        margin-top: 0;
      }
      .left {
        &-header {
          flex-wrap: wrap;

          .convert-value {
            min-width: 30%;
            width: 30%;
          }

          h4 {
            width: 100%;
          }
        }
      }
    }
  }

  @media (max-width: 750px) {
    .dashboard-main {
      .flex {
        /* overflow-x: hidden; */
        width: 100%;
        justify-content: space-between;
        margin-top: 16px;

        .bank-select {
          min-width: 60%;
          width: 66%;

          .dropdown {
            right: unset;
            left: 0;
          }
        }
      }

      section.flex {
        margin-top: 0;
      }
      .left {
        &-header {
          flex-wrap: wrap;

          .convert-value {
            min-width: 30%;
            width: 30%;
          }

          h4 {
            width: 100%;
          }
        }
      }
    }
  }

  .news {
    &__img {
      width: 100%;
    }
    &__header {
      font-weight: 600;
      font-size: 18px;
      line-height: 26px;
      color: #151e28;
    }
    &__content {
      padding: 18px 24px;
      width: 100%;
      text-align: left;
    }
    &__body {
      margin-top: 8px !important;
      text-align: left !important;
    }
    .carousel {
      margin-top: 24px !important;
      margin: 24px 0;
      margin-left: 24px;
    }
  }
`;
