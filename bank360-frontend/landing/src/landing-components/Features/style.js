import styled from "styled-components";

const FeaturesContainer = styled.section`
  background-color: var(--accent-white);

  [data-aos] {
    transition-duration: 0.5s !important;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    @media screen and (min-width: 960px) {
      flex-direction: column;
    }
  }

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  min-height: 500px;
  background-color: #34215C;
  border-radius: 5rem;
  padding: 5rem;
  animation: fadeIn 1s ease-out;
  align-items: center;
  margin-bottom: 10rem;

  @media screen and (max-width: 1320px) {
    border-radius: 0rem;

  }

  @media screen and (max-width: 1100px) {
    flex-direction: column-reverse; 
  }

  @media screen and (max-width: 420px) {
    padding-bottom: 5rem;
  }

  @media screen and (max-width: 350px) {
    padding-bottom: 4rem;
  }
}

.text-section {
  flex: 1;
  animation: slideInLeft 1s ease-out;
}

.icon .placeholder-icon, .placeholder-icon-2 {
  max-width: 50px;
  height: 50px;
  border-radius: 10px;
  animation: scaleUp 1s ease-out infinite alternate;
}

.placeholder-icon{
  background-color: #7B7BCB;
}

.placeholder-icon-2{
  background-color: #6dd3ec;
}

.placeholder-icon img{
  min-width: 50px;
}

.subtitle {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #FFF;
  margin-top: 20px;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 15px 0;
  color: #FFF;
  transition: color 0.3s ease;

  @media screen and (max-width: 530px) {
    font-size: 3rem;
  }
}

.title:hover {
  color: #4bc0c8;
}

.title-2 {
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 15px 0;
  color: #FFF;
  transition: color 0.3s ease;

  @media screen and (max-width: 530px) {
    font-size: 3rem;
  }
}


.title-2:hover {
  color: #34215C;
}

.description {
  font-size: 16px;
  color: #FFF;
  margin-bottom: 30px;
}

.cta, .cta-2 {
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
  position: relative;
  display: inline-block;
  animation: pulse 2s infinite;
}

.cta{
  color: #4bc0c8;
}

.cta-2{
  color: #34215C;

}

.cta::after, .cta-2::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  transition: transform 0.3s ease;
  transform: scaleX(0);
  transform-origin: right;
}

.cta::after{
  background-color: #4bc0c8;
}

.cta-2::after{
  background-color: #34215C;
}

.cta:hover::after, .cta-2:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}


.card-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: slideInRight 1s ease-out;
}

.card, card-3 {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: bounceIn 1s ease-out;

  @media screen and (max-width: 1100px) {
    min-width: 450px; 
  }

  @media screen and (max-width: 580px) {
    min-width: 350px; 
  }

  @media screen and (max-width: 480px) {
    min-width: 300px; 
  }

  @media screen and (max-width: 420px) {
    min-width: 280px;
  }

   @media screen and (max-width: 380px) {
    min-width: 240px;
  }

  @media screen and (max-width: 350px) {
    min-width: 220px;
  }

  @media screen and (max-width: 300px) {
    display: none;  }
}

.card-3{
  padding: 0px;
}

.card-3 img{
  max-width: 500px;

  @media screen and (max-width: 700px) {
    max-width: 450px;
  }

  @media screen and (max-width: 600px) {
    max-width: 370px;
  }

  @media screen and (max-width: 500px) {
    max-width: 270px;
  }

  @media screen and (max-width: 480px) {
    max-width: 300px;
  }

  @media screen and (max-width: 420px) {
    max-width: 290px;
  }

  @media screen and (max-width: 370px) {
    max-width: 260px;
  }

  @media screen and (max-width: 350px) {
    max-width: 230px;
    border-radius: 2rem;
  }

  @media screen and (max-width: 300px) {
    display: none;
    
  }
}

.balance-label {
  font-size: 14px;
  color: #8da4a5;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
}

.balance {
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0 20px;
  color: #000;
  transition: transform 0.3s ease, color 0.3s ease;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
}

.balance:hover {
  color: #4bc0c8;
  transform: scale(1.05);
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    padding: 8px 5px;
  }

  @media screen and (max-width: 380px) {
    font-size: 0.8rem;
    padding: 8px 5px;
  }
}

button:hover {
  transform: translateY(-2px);
}

.request-btn {
  background-color: #d6f3f3;
  color: #00a8a8;
}

.transfer-btn {
  background-color: #eafcfc;
  color: #008c8c;
}

.transactions {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.transactions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transactions-header p {
  font-size: 14px;
  font-weight: 500;
  color: #333;

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 380px) {
    font-size: 1rem;
  }
}

.see-all {
  font-size: 12px;
  color: #4bc0c8;
  text-decoration: none;
}

.transaction-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.transaction-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  animation: fadeIn 0.8s ease-out;
}

.transaction-details{
    align-items: center;
}

.transaction-details img{
  max-width: 25px;
  margin-right: 2rem;

  @media screen and (max-width: 480px) {
    margin-right: 0.5rem;
    max-width: 18px;
  }
}

.transaction-details p {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 400;
  padding-bottom: .5rem;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }

  @media screen and (max-width: 380px) {
    font-size: 7px;
  }
}

.transaction-name {
  font-weight: 600;
  color: #333;
}

.transaction-amount {
  font-size: 14px;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }

  @media screen and (max-width: 380px) {
    font-size: 7px;
  }
}

.transaction-amount.positive {
  color: #00a862;
}

.transaction-amount.negative {
  color: #e74c3c;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.aggregate-balance-card {
  width: 400px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;

  @media screen and (max-width: 580px) {
    max-width: 350px; 
  }

  @media screen and (max-width: 480px) {
    max-width: 280px; 
  }

  @media screen and (max-width: 420px) {
    max-width: 270px; 
  }

  @media screen and (max-width: 380px) {
    max-width: 230px; 
    max-height: 320px;
  }

  @media screen and (max-width: 350px) {
    max-width: 220px;
  }

  @media screen and (max-width: 300px) {
    display: none;  
  }

  @media screen and (max-width: 200px) {
    max-width: 100px;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header h3 {
  font-size: 18px;
  margin-bottom: 3rem;
  font-weight: 400;

  @media screen and (max-width: 380px) {
    font-size: 9px;
  }
}

.date-range {
  font-size: 12px;
  color: #999;
  margin-top: 2rem;

  @media screen and (max-width: 480px) {
    font-size: 7px;
  }
}

.icons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icons img {
  width: 20px;
  height: 20px;
  border-radius: 50%;

  @media screen and (max-width: 480px) {
    max-width: 15px; 
    height: auto;
  }

  @media screen and (max-width: 380px) {
    max-width: 10px; 
    height: auto;
  }
}

.icons span {
  font-size: 12px;
  background: #ddd;
  padding: 2px 6px;
  border-radius: 12px;

  @media screen and (max-width: 380px) {
    padding: 1px 3px;
    font-size: 9px;
  }
}

.chart-area {
  margin: 20px 0;
}

.placeholder-graph {
  border-radius: 10px;
  margin-top: 2rem;
}

.placeholder-graph img{
  width: 100%;
  height: 100%;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.footer-item {
  text-align: left;
}

.footer-item h4 {
  font-size: 12px;
  color: #555;
  margin: 0;

  @media screen and (max-width: 380px) {
    font-size: 9px;
  }
}

.footer-item p {
  font-size: 16px;
  margin: 5px 0;
  font-weight: 400;

  @media screen and (max-width: 480px) {
    font-size: 10px; 
    margin: 2px 0;
  }
}

.change {
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 10px;

  @media screen and (max-width: 480px) {
    padding: 1px 3px;
    font-size: 9px;
  }
}

.change.positive {
  color: #219653;
  background: #e8f8f0;
}

.change.negative {
  color: #e63946;
  background: #fdeaea;
}

`;

const Feature = styled.div`
  display: flex;
  color: #ffffff;
  margin-bottom: 16px;
  margin: 0 auto;
  font-size: 3rem;

  @media screen (max-width: 960px) {
    font-size: 2.5rem; 
  }
`;

const FeatureHeaderText = styled.h1`
  font-weight: 500;
  font-size: 5.3rem;
  color: var(--text-main);
  margin: 10rem auto;
  text-align: center;
  padding: 1rem;

  @media screen (max-width: 960px) {
    font-size: 3rem; 
    text-align: center;
    margin: 5rem auto;
  }

  @media screen and (max-width: 400px) {
      font-size: 2.6rem;
      margin: 3rem auto;

  }

  @media screen and (max-width: 50px) {
      font-size: 1rem;
  }
`;

const FeatureSubText = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  color: #5d6167;
  line-height: 2.09rem;

  @media (max-width: 1200px) {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  @media (max-width: 960px) {
    font-size: 1.4rem; /* Adjust subtext size for smaller screens */
  }
`;

export const FeaturesStyles = {
  FeaturesContainer,
  Feature,
  FeatureHeaderText,
  FeatureSubText,
};