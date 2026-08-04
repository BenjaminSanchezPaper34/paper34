import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import Stats from "@/components/home/Stats";
import SocialProofMosaic from "@/components/home/SocialProofMosaic";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Stats />
      <SocialProofMosaic />
      <Testimonials />
      <CTASection />
    </>
  );
}
