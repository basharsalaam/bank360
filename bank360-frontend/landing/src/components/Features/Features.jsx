// Imports
import { FeaturesStyles } from "./style";
import { Icons } from "../../assets/icons";
import React from 'react';


// Destructure imports
const { Wrapper, Feature, FeatureHeaderText, FeatureSubText } = FeaturesStyles;
const { Trend, SafetyIcon, Centralized } = Icons;

const Features = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <Feature>
          <figure data-aos="fade-up">
            <Centralized />
          </figure>
          <div>
            <FeatureHeaderText data-aos="fade-up">
            Centralized Account Management
            </FeatureHeaderText>
            <FeatureSubText data-aos="fade-up">
              Connect multiple bank accounts from different financial institutions. 
            </FeatureSubText>
          </div>
        </Feature>
        <Feature data-aos="fade-up" data-aos-delay="200">
          <figure data-aos="fade-up">
            <Trend />
          </figure>
          <div>
            <FeatureHeaderText data-aos="fade-up">
            Real-Time Financial Insights
            </FeatureHeaderText>
            <FeatureSubText data-aos="fade-up">
              Receive up-to-date information on balances and recent transactions across multiple accounts
            </FeatureSubText>
          </div>
        </Feature>
        <Feature data-aos="fade-up" data-aos-delay="400">
          <figure data-aos="fade-up">
            <SafetyIcon />
          </figure>
          <div>
            <FeatureHeaderText data-aos="fade-up">
              Guaranteed Security
            </FeatureHeaderText>
            <FeatureSubText data-aos="fade-up">
              All your transactions and funds are portected.
            </FeatureSubText>
          </div>
        </Feature>
      </section>
    </Wrapper>
  );
};

export default Features;
