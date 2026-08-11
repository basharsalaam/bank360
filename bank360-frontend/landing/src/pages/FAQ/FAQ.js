import { FaqStyles } from "./style";
import { Components } from "../../components";

const { Wrapper } = FaqStyles;
const { SubscribeCard, PricingBanner, Tabs, FAQ, Footer } = Components;

const Pricing = () => {
  return (
    <Wrapper>
      {/* {" "} */}
      {/* <PricingBanner /> */}
      {/* <Tabs /> <FAQ /> */}
      <SubscribeCard />
      <Footer />
    </Wrapper>
  );
};

export default Pricing;
