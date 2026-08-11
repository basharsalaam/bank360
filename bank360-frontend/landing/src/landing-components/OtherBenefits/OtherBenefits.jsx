import React from 'react';
import { OtherBenefitsStyles } from './style';
import benefit_1 from "../../assets/icons/benefit_1.svg"
import benefit_2 from "../../assets/icons/benefit_2.svg"
import benefit_3 from "../../assets/icons/benefit_3.svg"



const {
  Wrapper, 
  HeaderText
} = OtherBenefitsStyles;

const OtherBenefits = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <HeaderText>
          Other Benefits
        </HeaderText>
        <div className="benefits-section">
          <div className="benefits-container">
            <div className="benefit-card">
              <img src={benefit_1} alt="Expense Categorization Icon" className="benefit-icon" />
              <h3 className="benefit-title">Expense Categorization</h3>
              <p className="benefit-description">
                Organizes your transactions into specific categories to allow you easily monitor your spending habits and gain insights into where your money goes each month.
              </p>
            </div>
            <div className="benefit-card">
              <img src={benefit_2} alt="Balance Report Icon" className="benefit-icon" />
              <h3 className="benefit-title">End of Day Balance Report</h3>
              <p className="benefit-description">
                Receive a concise summary of your financial status at the end of each day compiling the total balances from all your connected bank accounts.
              </p>
            </div>
            <div className="benefit-card">
              <img src={benefit_3} alt="Data Security Icon" className="benefit-icon" />
              <h3 className="benefit-title">Enhanced Data Security</h3>
              <p className="benefit-description">
                Use of advanced encryption methods and secure authentication protocols safeguards your data from unauthorized access and cyber threats.
              </p>
            </div>
          </div>
        </div>

      </section>
    </Wrapper>
  );
};

export default OtherBenefits;
