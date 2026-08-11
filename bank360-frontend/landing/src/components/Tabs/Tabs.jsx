// Imports
import React from 'react';
import { useState } from "react";
import PricingPlanCard from "../PricingPlanCard/PricingPlanCard";
import { TabsStyles } from "./style";

// Destructure imports
const { Wrapper, TabsHeader, TabPanel, TabBody } = TabsStyles;

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const setActiveClassName = (index) => (activeTab === index ? "active" : "");
  return (
    <Wrapper className="main-wrapper">
      <section>
        <TabsHeader>
          <TabPanel>
            <button
              onClick={() => {
                setActiveTab(0);
              }}
              className={setActiveClassName(0)}
            >
              Monthly
            </button>
          </TabPanel>
          <TabPanel>
            <button
              onClick={() => {
                setActiveTab(1);
              }}
              className={setActiveClassName(1)}
            >
              Yearly
            </button>
          </TabPanel>
        </TabsHeader>
        <TabBody>
          <li className="card">
            <PricingPlanCard {...pricing} />
          </li>
          <li className="card">
            <PricingPlanCard {...pricing} />
          </li>
        </TabBody>
      </section>
    </Wrapper>
  );
};

export default Tabs;

const pricing = {
  type: "Basic",
  plan: "Free plan",
  price: 0,
  features: [
    "Ideal for growing companies",
    "Naming customization",
    "Custom reports",
  ],
};
