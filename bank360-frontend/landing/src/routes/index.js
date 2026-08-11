// Imports
import React from 'react';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Pages } from "../pages";
import { Components } from "../components";

// Destructure imports
const { Home, Pricing, FAQ } = Pages;
const { Navbar } = Components;

export const Routings = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  );
};
