import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background-color: var(--accent-white);

  [data-aos] {
    transition-duration: 0.5s !important;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;

    @media screen and (min-width: 960px) {
      flex-direction: row;
    }

    /* @media screen and (min-width: 1024px) {
      margin: 72px 0;
    }
    @media screen and (min-width: 1200px) {
      margin: 96px 0;
    } */
  }
`;

const Feature = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media screen and (min-width: 960px) {
    width: 31%;
  }

  svg {
    height: 56px;
    width: 56px;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.07);
    border-radius: 50%;
    margin-right: 16px;
  }
`;

const FeatureHeaderText = styled.h5`
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--text-main);
  margin-bottom: 6px;

  @media screen and (min-width: 960px) {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }
`;

const FeatureSubText = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  color: #5d6167;
  line-height: 2.09rem;

  @media screen and (min-width: 1200px) {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }
`;

export const FeaturesStyles = {
  Wrapper,
  Feature,
  FeatureHeaderText,
  FeatureSubText,
};
