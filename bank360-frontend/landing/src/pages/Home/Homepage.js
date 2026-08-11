import React from 'react';
import { HomeStyles } from "./style";
import { Components } from "../../landing-components";
import { useEffect } from "react";


const { Wrapper } = HomeStyles;
const {
  Navbar,
  HomeBanner,
  Features,
  OtherBenefits,
  IllustratedFeatures,
  SubscribeCard,
  Footer,
  CustomerReviews,
  Waitlist
} = Components;

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <HomeBanner />
      <Features />
      <OtherBenefits />
      <Waitlist />
      {/* <CustomerReviews /> */}
      {/* <SubscribeCard /> */}
      <Footer />
    </Wrapper>
  );
};

export default Home;
