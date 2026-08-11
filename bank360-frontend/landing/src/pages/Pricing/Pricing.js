import { PricingStyles } from "./style";
import { Components } from "../../landing-components";
import { useEffect } from "react";


const { Wrapper } = PricingStyles;
const { Navbar, Waitlist, PricingBanner, Tabs, Footer } = Components;

const Pricing = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner of the page
  }, []);
  
  return (
    <Wrapper>
      {" "}
      <Navbar />
      <PricingBanner />
      <Tabs /> 
      <Waitlist />
      <Footer />
    </Wrapper>
  );
};

export default Pricing;
