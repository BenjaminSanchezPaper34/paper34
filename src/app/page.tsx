import Hero from "@/components/home/Hero";
import OfferStack from "@/components/home/OfferStack";
import Stats from "@/components/home/Stats";
import SocialProofMosaic from "@/components/home/SocialProofMosaic";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

/**
 * Accueil — alternance des fonds (rupture assumée à chaque jonction) :
 * Hero (primary) → Offre (secondary) → Stats (primary) → Mosaïque (secondary)
 * → Témoignages (primary) → CTA (secondary).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferStack />
      <Stats />
      <SocialProofMosaic />
      <Testimonials />
      <CTASection />
    </>
  );
}
