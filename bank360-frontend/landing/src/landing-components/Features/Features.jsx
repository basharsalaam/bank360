// Imports
import { FeaturesStyles } from "./style";
import { Icons } from "../../assets/icons";
import React from "react";

import eyeicon from "./../../assets/icons/eyeicon.png"
import insightsicon from "./../../assets/icons/insightsicon.png"
import document from "./../../assets/icons/document.png"
import fbn from "./../../assets/icons/BankLogos/fbn-2.png";
import fcmb from "./../../assets/icons/BankLogos/fcmb.png";
import gtb from "./../../assets/icons/BankLogos/gtb.png";
import access from "./../../assets/icons/BankLogos/access-2.png";
import chart from "./../../assets/images/chart-2.svg";
import bankstatements from "./../../assets/images/bank-statements.svg";




// Destructure imports
const { FeaturesContainer, Feature, FeatureHeaderText, FeatureHeaderSubText, FeatureSubText } = FeaturesStyles;
const { Trend, SafetyIcon, Centralized } = Icons;

const Features = () => {
  return (
    <FeaturesContainer className="feature-container">
      <section>
        <div className="feature-header-text">
          <FeatureHeaderText data-aos="fade-up">
              Experience personal finance like never before.
          </FeatureHeaderText>
        </div>
        {/* <FeatureHeaderSubText data-aos="fade-up" >
              Receive real-time insights into your finances and track all your financial accounts effortlessly.
              Whether you’re managing expenses, setting budgets, or monitoring transactions, Bank360 provides a 
              seamless financial experience that empowers you to take control of your money. 
          </FeatureHeaderSubText> */}

        <div className="container">
          <div className="content">
            <div className="text-section">
              <div className="icon">
                <div className="placeholder-icon">
                  <img src={eyeicon} alt="" />
                </div>
              </div>
              <p className="subtitle">360° FINANCIAL CLARITY</p>
              <h1 className="title">Monitor, Manage, and Master Your Finances</h1>
              <p className="description">
              Bank360 helps you stay on top of your finances with ease. Monitor your account balance, track transactions,
               and set personalized savings goals—all from one seamless platform. Empower your financial journey today.
              </p>
              <a href="#" className="cta">Get Started →</a>
            </div>
            <div className="card-section" >
              <div className="card">
                <p className="balance-label">Your Aggregate Balance</p>
                <h2 className="balance">NGN 1,625,000</h2>
                <div className="buttons">
                  <button className="request-btn">Add Account</button>
                  <button className="transfer-btn">Remove Account</button>
                </div>
                <div className="transactions">
                  <div className="transactions-header">
                    <p>Recent Transactions</p>
                    <a href="#" className="see-all">See all</a>
                  </div>
                  <ul className="transaction-list">
                    <li>
                      <div className="transaction-details" style={{display: 'flex', flexDirection: 'row'}}>
                        <img src={gtb} alt="" />
                        <div className="details">
                          <p className="transaction-name">Guaranty Trust Bank</p>
                          <p className="transaction-date">Debit • 15 Feb - 8:53 PM</p>
                        </div>
                      </div>
                      <p className="transaction-amount negative">- N 34,000</p>
                    </li>
                    <li>
                      <div className="transaction-details" style={{display: 'flex', flexDirection: 'row'}}>
                        <img src={fbn} alt="" />
                        <div className="details">
                          <p className="transaction-name">First Bank of Nigeria</p>
                          <p className="transaction-date">Credit • 15 Feb - 5:11 PM</p>
                        </div>
                      </div>
                      <p className="transaction-amount positive">+ N 15,300</p>
                    </li>

                    <li>
                      <div className="transaction-details" style={{display: 'flex', flexDirection: 'row'}}>
                        <img src={access} alt="" />
                        <div className="details">
                          <p className="transaction-name">Access Bank</p>
                          <p className="transaction-date">Debit • 15 Feb - 9:02 AM</p>
                        </div>
                      </div>
                      <p className="transaction-amount negative">- N 62,000</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>  

        <div className="container">
          <div className="content" style={{backgroundColor: '#01A0C6'}} >
            <div className="text-section">
              <div className="icon">
                <div className="placeholder-icon-2">
                  <img src={insightsicon} alt="" />
                </div>
              </div>
              <p className="subtitle">CUSTOM ANALYTICS</p>
              <h1 className="title-2">Real Time Financial Insights</h1>
              <p className="description">
              Take control of your finances like never before with live updates and actionable insights
               that empower you to stay on top of your financial health. Effortlessly track your spending 
               in real-time, allowing you to identify trends and patterns that impact 
               your budgeting and saving strategies. 
              </p>
              <a href="#" className="cta-2">Get Started →</a>
            </div>
            <div className="aggregate-balance-card" >
            <div className="card-header">
              <h3>Aggregate Balance</h3>
              <div className="icons">
                <img src={fbn} alt="Icon 1"/>
                <img src={fcmb} alt="Icon 2"/>
                <span>+2</span>
              </div>
            </div>
            <span className="date-range">7<sup>th</sup> December - 7<sup>th</sup> January</span>
              <div className="placeholder-graph">
                <img src={chart} alt="" />
              </div>
            <div className="card-footer">
              <div className="footer-item">
                <h4>This month</h4>
                <p>N 147,860.22</p>
                <span className="change positive">+19.41%</span>
              </div>
              <div className="footer-item">
                <h4>This week</h4>
                <p>N 23,900.90</p>
                <span className="change negative">-9.77%</span>
              </div>
            </div>
          </div>
          </div>
        </div>      

        <div className="container">
          <div className="content">
            <div className="text-section">
              <div className="icon">
                <div className="placeholder-icon">
                  <img src={document} alt="" />
                </div>
              </div>
              <p className="subtitle">HASSLE FREE STATEMENT GENERATION</p>
              <h1 className="title">Unified Bank Statements</h1>
              <p className="description">
              Eliminate the hassle of managing multiple bank statements and gain complete visibility of all your accounts
               in one place. Download a single comprehensive bank statement that consolidates information from all your 
               connected accounts for easy tracking and management.
              </p>
              <a href="#" className="cta">Get Started →</a>
            </div>
            <div className="card-section">
              <div className="card-3">
                <img src={bankstatements} alt="" />
              </div>
            </div>
          </div>
        </div>  

        {/* <Feature>
          <figure data-aos="fade-up">
            <Centralized />
          </figure>
          <div>
            <FeatureHeaderText data-aos="fade-up">
            Centralized Account Management
            </FeatureHeaderText>
            <FeatureSubText data-aos="fade-up">
              Connect multiple bank accounts from different financial institutions. 
            </FeatureSubText>
          </div>
        </Feature>
        <Feature data-aos="fade-up" data-aos-delay="200">
          <figure data-aos="fade-up">
            <Trend />
          </figure>
          <div>
            <FeatureHeaderText data-aos="fade-up">
            Real-Time Financial Insights
            </FeatureHeaderText>
            <FeatureSubText data-aos="fade-up">
              Receive up-to-date information on balances and recent transactions across multiple accounts
            </FeatureSubText>
          </div>
        </Feature>
        <Feature data-aos="fade-up" data-aos-delay="400">
          <figure data-aos="fade-up">
            <SafetyIcon />
          </figure>
          <div>
            <FeatureHeaderText data-aos="fade-up">
              Guaranteed Security
            </FeatureHeaderText>
            <FeatureSubText data-aos="fade-up">
              All your transactions and funds are portected.
            </FeatureSubText>
          </div>
        </Feature> */}
      </section>
    </FeaturesContainer>
  );
};

export default Features;
