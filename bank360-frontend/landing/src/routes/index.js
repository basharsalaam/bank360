// Imports
import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Pages } from "../pages";
import { Components } from "../landing-components";

// Destructure imports
const { Home, Pricing, FAQ, Signup, Login, Homepage, Contact, OTP, Page404} = Pages;
const { Navbar } = Components;

export const Routings = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
