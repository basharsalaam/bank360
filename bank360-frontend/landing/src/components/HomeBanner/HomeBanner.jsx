// Imports
import React from 'react';
import { HomeBannerStyles } from "./style";
import { Link } from "react-router-dom";
import Illustration from "./../../assets/illustrations/banner.png";

// Destructure imports
const { Wrapper, HeaderText, SubHeaderText, FieldSet } = HomeBannerStyles;

const HomeBanner = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <aside>
          <HeaderText data-aos="fade-up">
            All of your bank accounts unified
          </HeaderText>
          <SubHeaderText data-aos="fade-up">
            Get a 360 view of all your finances across multiple banks accounts,
            at once.
          </SubHeaderText>
          <FieldSet className="btn-group">
            <Link to="/signup">
              <button className="register-btn" data-aos="fade-up">
                Get Started Now
              </button>
            </Link>
            <Link to="/contact">
              <button className="contact-btn" data-aos="fade-up">
                Contact Sales
              </button>
            </Link>
          </FieldSet>
        </aside>

        <img src={Illustration} alt="Bank360 dashboard" />
      </section>{" "}
    </Wrapper>
  );
};

export default HomeBanner;
