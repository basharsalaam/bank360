import { FaqStyles } from "./style";
import { Components } from "../../landing-components";
import { useEffect } from "react";

const { Wrapper } = FaqStyles;
const { Waitlist, Navbar, SubscribeCard, PricingBanner, Tabs, FAQ, Footer } = Components;


const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <FAQ />
      <Waitlist />
      <Footer />
    </Wrapper>
  );
};

export default Pricing;
