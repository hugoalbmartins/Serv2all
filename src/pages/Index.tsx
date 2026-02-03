import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      {/* Content wrapper - transparent to show fixed background */}
      <div className="relative z-10">
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
