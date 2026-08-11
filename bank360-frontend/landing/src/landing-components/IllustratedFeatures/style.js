import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background-color: var(--main-white);
  margin: 40px 0;

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;

    /* @media screen and (min-width: 1024px) {
      margin: 72px 0;
    }
    @media screen and (min-width: 1200px) {
      margin: 96px 0;
    } */
  }
`;

const IllustratedFeature = styled.div`
  display: flex;
  margin-bottom: 48px;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 56px;

    & > div {
      width: 50%;
    }

    &:nth-child(2n) {
      flex-direction: row-reverse;

      figure {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    margin-bottom: 72px;

    & > div {
      width: 45%;
    }
  }

  @media screen and (min-width: 1100px) {
    margin-left: 56px;
    margin-right: 56px;
  }

  @media screen and (min-width: 1200px) {
    margin-left: 72px;
    margin-right: 72px;
    margin-bottom: 96px;
  }

  figure {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    margin-bottom: 32px;

    @media screen and (min-width: 800px) {
      width: 50%;
    }
    @media screen and (min-width: 1024px) {
      height: 400px;
      /* width: 400px; */
    }
  }

  img {
    /* height: 400px; */
    width: 200px;
    height: 200px;

    @media screen and (min-width: 800px) {
      width: 100%;
    }

    @media screen and (min-width: 1024px) {
      height: 500px;
      width: 500px;
    }
  }
`;

const IllustrationHeaderText = styled.h5`
  font-weight: 700;
  font-size: 2.4rem;
  color: var(--text-main);
  margin-bottom: 6px;
  max-width: 480px;

  @media screen and (min-width: 800px) {
    font-size: 2.8rem;
    line-height: 3.5rem;
    margin-bottom: 8px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 3.2rem;
    line-height: 4rem;
    margin-bottom: 8px;
  }
`;

const IllustrationSubText = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  color: #5d6167;
  line-height: 2.275rem;
  margin-top: 14px;
  /* max-width: 480px; */

  @media screen and (min-width: 1024px) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    margin-top: 20px;
  }
`;

const LearnMoreButton = styled.button`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: #535379;
  padding: 8px 18px;
  background: #ffffff;
  border: 1px solid #dadae7;
  border-radius: 8px;
  margin-top: 14px;

  @media screen and (min-width: 1024px) {
    padding: 12px 24px;
    margin-top: 20px;
  }

  &:hover {
    border-color: var(--main-text);
  }
`;

export const IllustratedFeaturesStyles = {
  Wrapper,
  IllustratedFeature,
  IllustrationHeaderText,
  IllustrationSubText,
  LearnMoreButton,
};

// etiosa
// surulere
// lagos mainland
// island
// apapa
// change ypp.com to ypp.ng
// make navbar fixed
