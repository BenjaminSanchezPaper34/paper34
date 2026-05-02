import LabSplashScene from "@/components/lab/LabSplashScene";

export default function SplashLightPaintingPage() {
  return (
    <LabSplashScene
      badge="Light painting · photographe"
      tagline="Bougez la souris"
      titlePre="Capter la "
      highlight="lumière"
      titlePost=", pas l'instant."
      subline="Pose longue : les traînées de lumière persistent comme sur une expo de 30 secondes."
      background="#0a0a0f"
      withOrbs={false}
      colors={[
        { r: 1.0, g: 0.95, b: 0.85 }, // blanc chaud
        { r: 1.0, g: 0.75, b: 0.3 },  // doré
        { r: 1.0, g: 0.45, b: 0.1 },  // orange flamme
        { r: 1.0, g: 0.85, b: 0.55 }, // ambre
      ]}
      densityDissipation={0.8}
      velocityDissipation={1.2}
      curl={1.5}
      splatRadius={0.12}
      splatForce={7500}
    />
  );
}
