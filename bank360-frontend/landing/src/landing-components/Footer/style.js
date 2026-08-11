import styled from "styled-components";

const Container = styled.div`
  .footer {
    background-color: #ffffff;
    padding: 40px 60px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    border-top: 1px solid #dddddd;
  }

  .footer-section {
    margin: 10px 20px;
    flex: 1; /* Allow sections to grow equally */
  }

  .footer-section.brand {
    flex: 1;
  }

  .footer-logo {
    max-width: 100px;
    margin-bottom: 10px;
  }

  .footer-section p {
    margin: 10px 0;
    font-size: 14px;
    color: #666666;
  }

  .social-links{
    display: flex;
    flex-direction: row;
  }

  .social-links a {
    margin-right: 10px;
    font-size: 14px;
    color: #666666;
    text-decoration: none;
  }

  .footer-section h4 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-section ul li {
    margin: 5px 0;
  }

  .footer-section ul li a {
    text-decoration: none;
    font-size: 14px;
    color: #666666;
  }

  .footer-section ul li a:hover {
    text-decoration: underline;
    color: #000000;
  }

  .footer-section.download {
    display: flex;
    flex-direction: column;
    max-width: contain;
  }

  .footer-section.downloads{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .footer-section.downloads a img {
    max-width: 100px;
  }

  .footer-bottom {
    margin-top: 20px;
    text-align: center;
    width: 100%;
    font-size: 12px;
    color: #666666;
  }

  .footer-bottom a {
    text-decoration: none;
    color: #666666;
    margin: 0 5px;
  }

  .footer-bottom p {
    margin-top: 5px;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .footer {
      padding: 20px 30px;
      flex-direction: column; /* Stack sections vertically */
      align-items: center; /* Center align items */
    }

    .footer-section {
      margin: 10px 0; /* Adjust margin for stacked layout */
      width: 100%; /* Full width for each section */
    }

    .footer-bottom {
      font-size: 10px; /* Smaller font size for mobile */
    }
  }

  @media (max-width: 480px) {
    .footer {
      padding: 15px 20px; /* Further reduce padding */
    }

    .footer-section h4 {
      font-size: 14px; /* Smaller heading size */
    }

    .footer-section p,
    .social-links a,
    .footer-section ul li a {
      font-size: 12px; /* Smaller text size */
    }
  }
`;

export const FooterStyles = { Container };