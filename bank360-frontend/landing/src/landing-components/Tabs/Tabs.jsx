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
            <PricingPlanCard {...basic_plan} />
          </li>
          <li className="card">
            <PricingPlanCard {...premium_plan} />
          </li>
        </TabBody>
      </section>
    </Wrapper>
  );
};

export default Tabs;

const basic_plan = {
  type: "Basic",
  plan: "Free",
  price: '₦ 0',
  features: [
    "Aggregate Balance Dashboard.",
    "Link up to 3 bank accounts.",
    "Real-time balance tracking.",
    "Automatic categorization of transactions.",
    "Insights into top spending categories.",
    "Notifications for transactions and account balances."
  ],
};

const premium_plan = {
  type: "Enterprise",
  plan: "Premium",
  price: 'Coming Soon',
  features: [
    "Link unlimited bank accounts.",
    "Advanced spending analytics with detailed reports.",
    "Customizable financial dashboards.",
    "Daily, Weekly and Monthly financial summaries.",
    "Export financial reports in PDF or Excel formats.",
    "Real-time financial insights."
  ],
};

const enteprise_plan = {
  type: "Business",
  plan: "Enterprise",
  price: 'Coming Soon',
  features: [
    "Basic Plan Features",
    "Connect multiple bank accounts",
    "Personalized alerts for specific triggers",
    "Weekly insights on spending trends",
    "Real-time transaction updates"
  ],
};
