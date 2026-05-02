import LabSplashScene from "@/components/lab/LabSplashScene";

export default function SplashCmykPage() {
  return (
    <LabSplashScene
      badge="Encre CMJN · graphiste"
      tagline="Bougez la souris"
      titlePre="Du "
      highlight="trait"
      titlePost=" à la presse."
      subline="Quatre encres, une seule source — splash CMJN inspiré de la séparation 4 couleurs en print."
      background="#f5f1ea"
      withOrbs={false}
      colors={[
        { r: 0, g: 0.7, b: 1 },        // cyan
        { r: 1, g: 0, b: 0.55 },       // magenta
        { r: 1, g: 0.85, b: 0 },       // jaune
        { r: 0.05, g: 0.05, b: 0.1 },  // noir
      ]}
      densityDissipation={1.6}
      velocityDissipation={2.5}
      curl={2}
      splatRadius={0.18}
      splatForce={5500}
    />
  );
}
