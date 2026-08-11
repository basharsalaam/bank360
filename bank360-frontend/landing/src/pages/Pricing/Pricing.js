import { PricingStyles } from "./style";
import { Components } from "../../components";

const { Wrapper } = PricingStyles;
const { SubscribeCard, PricingBanner, Tabs, FAQ, Footer } = Components;

const Pricing = () => {
  return (
    <Wrapper>
      {" "}
      <PricingBanner />
      <Tabs /> <FAQ />
      <SubscribeCard />
      <Footer />
    </Wrapper>
  );
};

export default Pricing;
