import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Journey from "../../components/Journey";
import FounderDoubts from "../../components/FounderDoubts";
import Metrics from "../../components/Metrics";
import Features from "../../components/Features";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-pitchsap-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Journey />
      <FounderDoubts />
      <Metrics />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;