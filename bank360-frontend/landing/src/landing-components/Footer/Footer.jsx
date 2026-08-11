import React from 'react';
import { FooterStyles } from "./style";
import { Icons } from "../../assets/icons";

// Destructure imports
const { Container } = FooterStyles;
const { Logo, Facebook, Instagram, Linkedin, X, PlayStore, AppStore } = Icons;

const Footer = () => {
  return (
    <Container >
      <div className="footer">
      <div className="footer-section brand">
        <Logo alt="Bank360 Logo" className="footer-logo" />
          <p>Financial Clarity, at your fingertips</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank"><Facebook /></a>
            <a href="https://instagram.com" target="_blank"><Instagram /> </a>
            <a href="https://linkedin.com" target="_blank"><Linkedin /></a>
            <a href="https://x.com" target="_blank"><X /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h4>Products</h4>
          <ul>
            <li><a href="#">Credit Score</a></li>
            <li><a href="#">Carbon Print</a></li>
            <li><a href="#">Bank Statement</a></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>Tools</h4>
          <ul>
            <li><a href="#">Revenue Simulator</a></li>
            <li><a href="#">Tax Calculator</a></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>Help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Legal Compliance</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Press and Media</a></li>
          </ul>
        </div>

        <div className="footer-section downloads">
          <h4>Coming Soon</h4>
          <a href="#" target="_blank">
            <img src={PlayStore} alt="" />
          </a> <br />
          
          <a href="#" target="_blank">
          <img src={AppStore} alt="" />
          </a>
          
        </div>

        <div className="footer-bottom">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <p>Copyright © 2025, Bank360. All Rights Reserved.</p>
        </div>
      </div>
    </Container>

  );
};

export default Footer;
