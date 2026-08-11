// Imports
import React from 'react';
import { NavbarStyles } from "./style";
import { Icons } from "./../../assets/icons";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

// Destructure imports
const { Wrapper } = NavbarStyles;
const { Logo, MenuIcon } = Icons;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Wrapper className="main-wrapper">
      <section>
        <Link to="/">
          <figure>
            <Logo className="logo" />
          </figure>
        </Link>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
          
        </nav>
        <button
          className="menu-btn"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <MenuIcon />
        </button>
        {isMenuOpen && (
          <section className="dropdown ">
            <div
              className="overlay"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            ></div>
            <section className="dropdown__container">
              <Link to="/" className="logo-link">
                <figure>
                  <Logo className="logo-dropdown" />
                </figure>
              </Link>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Homepage
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Pricing
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                FAQ
              </NavLink>
              <a
                href="https://-frontend.netlify.app/"
                className="register-btn-nav"
                target={"_blank"}
                rel="noreferrer"
              >
                Get Started Now
              </a>
            </section>
          </section>
        )}
        <a
          href="https://-frontend.netlify.app/"
          className="register-btn"
          target={"_blank"}
          rel="noreferrer"
        >
          Get Started Now
        </a>
      </section>{" "}
    </Wrapper>
  );
};

export default Navbar;
