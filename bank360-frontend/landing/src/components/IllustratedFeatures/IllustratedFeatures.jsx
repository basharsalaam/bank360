// Imports
import React from 'react';
import { IllustratedFeaturesStyles } from "./style";
import { Illustrations } from "../../assets/illustrations";

// Destructure imports
const {
  Wrapper,
  IllustratedFeature,
  IllustrationSubText,
  IllustrationHeaderText,
  LearnMoreButton,
} = IllustratedFeaturesStyles;
const { Illustration1, Illustration2, Illustration3, Illustration4 } =
  Illustrations;

const IllustratedFeatures = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <IllustratedFeature>
          <figure>
            <img src={Illustration1} alt="Unified bank statement" />
          </figure>
          <div>
            <IllustrationHeaderText data-aos="fade-up">
              Unified bank statement
            </IllustrationHeaderText>
            <IllustrationSubText data-aos="fade-up">
              Eliminate multiple statements and gain complete visibility of your
              entire bank accounts. Download a single bank statement for all
              accounts.
            </IllustrationSubText>
            <LearnMoreButton data-aos="fade-up">Learn more</LearnMoreButton>
          </div>
        </IllustratedFeature>
        <IllustratedFeature>
          <figure>
            <img src={Illustration2} alt="Trends and Charts" />
          </figure>
          <div>
            <IllustrationHeaderText data-aos="fade-up">
              Trends and Charts
            </IllustrationHeaderText>
            <IllustrationSubText data-aos="fade-up">
            Gain deeper insights into your financial habits with interactive graphs and charts that help you track your
             spending patterns over time, compare income versus expenses and identify trends. 
            </IllustrationSubText>
            <LearnMoreButton data-aos="fade-up">Learn more</LearnMoreButton>
          </div>
        </IllustratedFeature>
        <IllustratedFeature>
          <figure>
            <img src={Illustration3} alt="Credit score and report" />
          </figure>
          <div>
            <IllustrationHeaderText data-aos="fade-up">
              Credit score and report
            </IllustrationHeaderText>
            <IllustrationSubText data-aos="fade-up">
            Easily check your credit score, understand the factors influencing it, and access detailed reports that guide you
             in making informed decisions to enhance your financial health.
            </IllustrationSubText>
            <LearnMoreButton data-aos="fade-up">Learn more</LearnMoreButton>
          </div>
        </IllustratedFeature>
        <IllustratedFeature>
          <figure>
            <img src={Illustration4} alt="Spend analyzer" />
          </figure>
          <div>
            <IllustrationHeaderText data-aos="fade-up">
              Spend Analyzer
            </IllustrationHeaderText>
            <IllustrationSubText data-aos="fade-up">
              Discover relevant patterns and relationships in your aggregated
              financial data. Draw insights from the inflows and outflows in
              your aggregated bank accounts. 
            </IllustrationSubText>
            <LearnMoreButton data-aos="fade-up">Learn more</LearnMoreButton>
          </div>
        </IllustratedFeature>
      </section>
    </Wrapper>
  );
};

export default IllustratedFeatures;
