import { Header } from "pages/BankStatements/modules/Header";
import styled from "styled-components";

const Wrapper = styled.section`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  background-color: var(--main-white);
  margin: 10rem 0;

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    /* @media screen and (min-width: 1024px) {
      margin: 72px 0;
    }
    @media screen and (min-width: 1200px) {
      margin: 96px 0;
    } */
  }

.benefits-section {
  text-align: center;
  padding: 2rem;
  background-color: #ffffff;
  width: 100%;
}

.benefits-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 2rem;
}

.benefits-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.benefit-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin: 3rem auto; 
  text-align: center;
  max-width: 300px; 
  width: 100%; 
}

.benefits-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 2rem; 
}

@media (max-width: 768px) {
  .benefit-card {
    padding: 2rem;
    margin: 1.5rem; /* Reduce spacing */
  }
}

@media (max-width: 480px) {
  .benefit-card {
    padding: 1.5rem;
    margin: 1rem; /* Further reduce margin */
  }
}


.benefit-icon {
  width: 50px;
  height: 50px;
  margin: 0rem auto;
  margin-bottom: 1rem;
}

.benefit-title {
  font-size: 2.4rem;
  font-weight: 600;
  color: #2d1c6a; /* Example color */
  margin-bottom: 1rem;
  line-height: 2.5rem;

  @media screen and (max-width: 280px) {
      font-size: 1.6rem;
    }
}

.benefit-description {
  font-size: 1.7rem;
  color: #666666;
  line-height: 1.5;
}

`;

const HeaderText = styled.h1`
  font-size: 3.5rem;
  font-weight: 500;
  margin: 0px auto;
  text-align: center;

  @media screen and (max-width: 280px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 900px) {
      font-size: 3rem;
    }
  `

export const OtherBenefitsStyles = {
  Wrapper,
  HeaderText,
};

// etiosa
// surulere
// lagos mainland
// island
// apapa
// change ypp.com to ypp.ng
// make navbar fixed
