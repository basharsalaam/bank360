// Imports
import React from 'react';
import { FooterStyles } from "./style";
import { Icons } from "../../assets/icons";
import { Link, NavLink } from "react-router-dom";

// Destructure imports
const { Wrapper } = FooterStyles;
const { Logo } = Icons;

const Footer = () => {
  return (
    <Wrapper className="main-wrapper">
      <section>
        <div className="flex">
          <div className="flex__one ">
                <Link to="/">
                  <Logo className="logo" />
                </Link>
            <p>
            Bank360 is your go-to online platform for managing all your financial accounts in one place. 
            Effortlessly aggregate your bank account information, track spending habits, and gain valuable insights into your financial health.
            </p>
          </div>
          <div className="flex__two">
            <section>
              <h3>Company</h3>
              <ul>
                <li>
                  <NavLink to="/">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/">Our Courses</NavLink>
                </li>
              </ul>
            </section>
            <section>
              <h3>Follow us</h3>
              <ul>
                <li>
                  <NavLink to="/">Twitter</NavLink>
                </li>
                <li>
                  <NavLink to="/">Instagram</NavLink>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="flex">
          <div className="flex__one flex__one-nopad">
            <p>© Octave Analytics 2024, All Rights Reserved </p>
          </div>
          <div className="flex__two flex__two-nopad">
            <a href="#">Privacy & Policy </a>
            <div className="divider">|</div>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Footer;
