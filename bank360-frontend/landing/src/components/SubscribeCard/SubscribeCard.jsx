// Imports
import React from 'react';
import { SubscribeCardStyles } from "./style";
import { Illustrations } from "../../assets/illustrations";

// Destructure imports
const { Wrapper, CardHeaderText, CardSubText, Form } = SubscribeCardStyles;
const { Quadrant } = Illustrations;

const SubscribeCard = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <CardHeaderText data-aos="fade-up">
          Financial analytics that matters
        </CardHeaderText>
        <CardSubText data-aos="fade-up">
          Analyse your cash flow with ease. Transform your business with an all
          in one platform.
        </CardSubText>
        <Form data-aos="fade-up">
          <input type="text" placeholder="Email" />
          <button>Get Started</button>
        </Form>
        <Quadrant className="quadrant" />
      </section>
    </Wrapper>
  );
};

export default SubscribeCard;
