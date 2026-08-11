// Imports
import React from 'react';
import { NavbarStyles } from "./style";
import { Icons } from "../../assets/icons";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

// Destructure imports
const { Wrapper } = NavbarStyles;
const { Logo, MenuIcon } = Icons;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Wrapper className="header">
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
            Contact Us
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
              <a href="https://app.bank360.ng/register">
                <button className="login-btn-nav">
                Sign Up
                </button>
              </a>
              <a href="https://app.bank360.ng/signin">
                <button className="register-btn-nav">
                Login
                </button>
              </a>
            </section>
          </section>
        )}
        <div className='nav-btns'>
            <a
            className="login-btn"
            href="https://app.bank360.ng/signin"
            rel="noreferrer">
              Log in
            </a>
            <a
            href="https://app.bank360.ng/register"
            className="register-btn"
            rel="noreferrer"
          >
            Sign Up
            </a>
        </div>
      </section>{" "}
    </Wrapper>
  );
};

export default Navbar;
