import React from "react";
// Global Components
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
// Sections
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import CTABanner from "../components/sections/CTABanner";
// Cards
import FeatureCard from "../components/cards/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <Hero />

        {/* FEATURES GRID SECTION */}
        <section className="py-20 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                type="warning"
                title="Educational Use Only"
                desc="The AI provides screening suggestions, not final medical diagnoses."
              />
              <FeatureCard 
                type="info"
                title="95%+ Accuracy"
                desc="Validated against professional dermatological datasets and benchmarks."
              />
              <FeatureCard 
                type="success"
                title="Secure & Private"
                desc="End-to-end encryption for all uploaded images and patient data."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* CTA BANNER */}
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}