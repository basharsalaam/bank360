// Imports
import { PricingBannerStyles } from "./style";

// Destructure imports
const { Wrapper, HeaderText, SubHeaderText, FieldSet } = PricingBannerStyles;

const PricingBanner = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <HeaderText>Our pricing plan</HeaderText>
        <SubHeaderText>
          Get a 360 view of all your finances across multiple banks accounts, at
          once.
        </SubHeaderText>
        {/* <FieldSet className="btn-group">
          <button className="register-btn">Get Started Now</button>
          <button className="contact-btn">Contact Sales</button>
        </FieldSet> */}
      </section>{" "}
    </Wrapper>
  );
};

export default PricingBanner;
