import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainSection from './components/PainSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import About from './components/About';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-background text-text min-h-screen">
      <Navbar />
      <Hero />
      <PainSection />
      <BenefitsSection />
      <HowItWorks />
      <Testimonials />
      <About />
      <CTASection />
      <Footer />
    </div>
  );
};

export default App;