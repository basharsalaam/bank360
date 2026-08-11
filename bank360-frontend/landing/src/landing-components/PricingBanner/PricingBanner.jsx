// Imports
import { PricingBannerStyles } from "./style";

// Destructure imports
const { Wrapper, HeaderText, SubHeaderText, FieldSet } = PricingBannerStyles;

const PricingBanner = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <HeaderText>Our Pricing Plans</HeaderText>
        <SubHeaderText>
        Maximize your financial capabilities with our adaptable pricing options, crafted to align perfectly with your requirements.
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
