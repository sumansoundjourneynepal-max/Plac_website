import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import BenefitsSection from '../components/BenefitsSection';
import PainSection from '../components/PainSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <BenefitsSection />
      <PainSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </div>
  );
}
