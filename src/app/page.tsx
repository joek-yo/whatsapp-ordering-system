"use client";

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <Hero />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;