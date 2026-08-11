// Imports
import React from 'react';
import AccordionComponent from "../Accordion/Accordion";
import { FAQStyles } from "./style";
import { Avatars } from "../../assets/avatars";
import { Icons } from "../../assets/icons";

// Destructure imports
const { Wrapper } = FAQStyles;
const { avatarGroup } = Avatars;
const { ArrowGo } = Icons;

const FAQ = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <h2>Frequently asked questions?</h2>
        <div className="accordion-container">
          <AccordionComponent
            items={[
              {
                uuid: "1",
                heading: <h3>Eget bibendum magna fringilla pharetra </h3>,
                content: (
                  <p>
                    Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7. Got a problem? Just get in touch.
                    Our support team is available 24/7.Got a problem? Just get
                    in touch. Our support team is available 24/7.Got a problem?
                    Just get in touch. Our support team is available 24/7.Got a
                    problem? Just get in touch. Our support team is available
                    24/7.Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7.
                  </p>
                ),
              },
              {
                uuid: "2",
                heading: <h3>Nulla commodo lectus amet</h3>,
                content: (
                  <p>
                    Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7. Got a problem? Just get in touch.
                    Our support team is available 24/7.Got a problem? Just get
                    in touch. Our support team is available 24/7.Got a problem?
                    Just get in touch. Our support team is available 24/7.Got a
                    problem? Just get in touch. Our support team is available
                    24/7.Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7.
                  </p>
                ),
              },
              {
                uuid: "3",
                heading: <h3>Imperdiet dolor leo tincidunt</h3>,
                content: (
                  <p>
                    Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7. Got a problem? Just get in touch.
                    Our support team is available 24/7.Got a problem? Just get
                    in touch. Our support team is available 24/7.Got a problem?
                    Just get in touch. Our support team is available 24/7.Got a
                    problem? Just get in touch. Our support team is available
                    24/7.Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7.
                  </p>
                ),
              },
              {
                uuid: "4",
                heading: <h3>Sapien amet dis amet </h3>,
                content: (
                  <p>
                    Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7. Got a problem? Just get in touch.
                    Our support team is available 24/7.Got a problem? Just get
                    in touch. Our support team is available 24/7.Got a problem?
                    Just get in touch. Our support team is available 24/7.Got a
                    problem? Just get in touch. Our support team is available
                    24/7.Got a problem? Just get in touch. Our support team is
                    available 24/7.Got a problem? Just get in touch. Our support
                    team is available 24/7.
                  </p>
                ),
              },
            ]}
          />
        </div>

        <div className="avatar-grp">
          <img src={avatarGroup} alt="Avatar group" />
          <h4>Still have questions?</h4>
          <a href="mailto:info@bank360.ng">
            Contact us
            <span>
              <ArrowGo />
            </span>
          </a>
        </div>
      </section>
    </Wrapper>
  );
};

export default FAQ;
