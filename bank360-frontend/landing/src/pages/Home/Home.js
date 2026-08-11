import React from 'react';
import { HomeStyles } from "./style";
import { Components } from "../../components";

const { Wrapper } = HomeStyles;
const {
  HomeBanner,
  Features,
  IllustratedFeatures,
  SubscribeCard,
  Footer,
  CustomerReviews,
} = Components;

const Home = () => {
  return (
    <Wrapper>
      <HomeBanner />
      <Features />
      <IllustratedFeatures />
      <CustomerReviews />
      <SubscribeCard />
      <Footer />
    </Wrapper>
  );
};

export default Home;
