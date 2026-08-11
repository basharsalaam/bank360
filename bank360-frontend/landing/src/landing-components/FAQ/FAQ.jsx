// Imports
import React from 'react';
import AccordionComponent from "../Accordion/Accordion";
import { FAQStyles } from "./style";
import { Avatars } from "../../assets/avatars";
import { Icons } from "../../assets/icons";

// Destructure imports
const { Wrapper } = FAQStyles;
const { ArrowGo } = Icons;

const FAQ = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <h2>Frequently Asked Questions</h2>
        <div className="accordion-container">
          <div className="faq-category">
            <h2>General Questions</h2>
          </div>
          <AccordionComponent
            items={[
              {
                uuid: "1",
                heading: <h3>What is Bank360 and how does it work? </h3>,
                content: (
                  <p>
                    Bank360 is a financial management app designed to help you monitor your finances,
                     gain real-time insights, track spending, and achieve your financial goals. 
                     It syncs with your bank accounts and provides a single platform to view all your 
                     financial activities.
                  </p>
                ),
              },
              {
                uuid: "2",
                heading: <h3>Is Bank360 free to use, or are there subscription plans available?</h3>,
                content: (
                  <p>
                    Bank360 offers both free and premium plans. The free plan includes basic features like account tracking
                     and insights, while the premium plan offers advanced tools like detailed reports, custom insights, 
                     and enhanced analytics.
                  </p>
                ),
              },
              {
                uuid: "3",
                heading: <h3>How do I sign up for a Bank360 account?</h3>,
                content: (
                  <p>
                    To sign up for a Bank360 account, simply visit our website where you can 
                    complete the registration process easily. Fill out the required information,
                     and you'll be on your way to managing your finances effectively. The Bank360
                      mobile app versions will be available for download soon. Stay tuned for updates!
                  </p>
                ),
              },
              {
                uuid: "4",
                heading: <h3>Can I access Bank360 on multiple devices? </h3>,
                content: (
                  <p>
                    Yes, Bank360 supports multiple device logins. Your account syncs seamlessly across smartphones,
                     tablets, and desktops.
                  </p>
                ),
              },
              {
                uuid: "5",
                heading: <h3>Does Bank360 work for both personal and business finances? </h3>,
                content: (
                  <p>
                    Yes, Bank360 is versatile and works for both personal and business financial tracking. 
                    You can manage personal budgets, monitor business expenses, or even separate them into different dashboards.
                  </p>
                ),
              },
            ]}
          />
          <div className="faq-category">
            <h2>Security and Privacy</h2>
          </div>
          <AccordionComponent
            items={[
              {
                uuid: "7",
                heading: <h3>How secure is my financial information on Bank360? </h3>,
                content: (
                  <p>
                    Bank360 prioritizes your data security with bank-grade encryption
                    to ensure your information is safe from unauthorized access.
                  </p>
                ),
              },
              {
                uuid: "8",
                heading: <h3>Who can access my financial data on the app? </h3>,
                content: (
                  <p>
                    Only you have access to your financial data. Bank360 does not share 
                    your information with third parties without your consent.
                  </p>
                ),
              },
              {
                uuid: "9",
                heading: <h3>How does Bank360 ensure my transactions are secure?</h3>,
                content: (
                  <p>
                    Bank360 uses end-to-end encryption and secure APIs to sync transactions directly 
                    from your bank without storing sensitive information.
                  </p>
                ),
              },
            ]}
          />
          <div className="faq-category">
            <h2>Account Management</h2>
          </div>
          <AccordionComponent
            items={[
              {
                uuid: "10",
                heading: <h3>Can I link multiple bank accounts to Bank360? </h3>,
                content: (
                  <p>
                    Yes, you can link multiple accounts, including savings, current, and credit card accounts,
                     to view and manage them in one place.
                  </p>
                ),
              },
              {
                uuid: "11",
                heading: <h3>Does Bank360 support all Nigerian banks?</h3>,
                content: (
                  <p>
                    Bank360 supports most major Nigerian banks and financial institutions. Please refer to the website for a full list of supported banks and institutions.
                  </p>
                ),
              },
              {
                uuid: "12",
                heading: <h3>How do I unlink a bank account?</h3>,
                content: (
                  <p>
                    Go to the settings section of the app, select the account you want to remove, and click Remove Account.”
                  </p>
                ),
              },
              {
                uuid: "13",
                heading: <h3>What should I do if I encounter issues syncing my bank account? </h3>,
                content: (
                  <p>
                    Ensure your bank credentials are up-to-date and retry. If the issue persists, contact customer support for assistance.
                  </p>
                ),
              },
            ]}
          />

          <div className="faq-category">
            <h2>Financial Insights and Reports</h2>
          </div>
          <AccordionComponent
            items={[
              {
                uuid: "14",
                heading: <h3>How does Bank360 generate financial insights and trends? </h3>,
                content: (
                  <p>
                    The app analyzes your transaction history and spending patterns 
                    to generate personalized insights.
                  </p>
                ),
              },
              {
                uuid: "15",
                heading: <h3> Can I download or export my financial reports?</h3>,
                content: (
                  <p>
                    Yes, Bank360 allows you to download detailed reports further analysis.
                  </p>
                ),
              },
              {
                uuid: "16",
                heading: <h3> How often does the app update my account balances?</h3>,
                content: (
                  <p>
                    Account balances are updated in real-time or as soon as your linked bank provides new transaction data.
                  </p>
                ),
              },
              {
                uuid: "17",
                heading: <h3>How do I customize the insights I see on my dashboard? </h3>,
                content: (
                  <p>
                    You can personalize your dashboard by selecting specific financial metrics or insights from the settings menu.
                  </p>
                ),
              },
            ]}
          />
          <div className="faq-category">
            <h2>Integration</h2>
          </div>
          <AccordionComponent
            items={[
              {
                uuid: "18",
                heading: <h3> Can I integrate Bank360 with other financial apps or services? </h3>,
                content: (
                  <p>
                    Yes, Bank360 supports integration with select apps for enhanced financial management.
                  </p>
                ),
              },
              {
                uuid: "19",
                heading: <h3> How does Bank360 handle data integration with different financial institutions?</h3>,
                content: (
                  <p>
                    Bank360 uses secure APIs to sync data across multiple financial institutions while maintaining compliance with industry standards.
                  </p>
                ),
              },
            ]}
          />
        </div>

        <div className="contact-us">
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
