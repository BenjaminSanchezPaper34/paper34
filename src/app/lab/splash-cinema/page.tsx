import LabSplashScene from "@/components/lab/LabSplashScene";

export default function SplashCinemaPage() {
  return (
    <LabSplashScene
      badge="Color grading · vidéaste"
      tagline="Bougez la souris"
      titlePre="L'image, "
      highlight="étalonnée"
      titlePost="."
      subline="Teal & orange — la palette signature du cinéma. Volutes plus turbulentes, comme de la fumée colorée."
      background="#06080d"
      withOrbs={false}
      colors={[
        { r: 0, g: 0.5, b: 0.55 },    // teal profond
        { r: 0.1, g: 0.65, b: 0.7 },  // teal clair
        { r: 1.0, g: 0.5, b: 0.15 },  // orange chaud
        { r: 1.0, g: 0.75, b: 0.45 }, // crème orangé
      ]}
      densityDissipation={1.4}
      velocityDissipation={1.8}
      curl={6}
      splatRadius={0.22}
      splatForce={6500}
    />
  );
}
