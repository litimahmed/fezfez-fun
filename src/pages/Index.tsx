import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { FAQ } from "@/components/FAQ";
import { VideoBanner } from "@/components/VideoBanner";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { Packages } from "@/components/Packages";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <FAQ />
      <VideoBanner />
      <Partners />
      <Packages />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
