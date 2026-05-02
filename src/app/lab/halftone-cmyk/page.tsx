import LabScene from "@/components/lab/LabScene";
import HalftoneCmyk from "@/components/lab/HalftoneCmyk";

export default function HalftoneCmykPage() {
  return (
    <LabScene
      badge="Halftone CMJN · graphiste"
      tagline="Bougez la souris"
      titlePre="Du "
      highlight="point"
      titlePost=", l'image."
      subline="Vraie trame d'impression offset 4 couleurs : chaque canal a son angle (15°/75°/0°/45°) — et chaque mouvement dépose une goutte d'encre."
      background="#f3ede1"
      textColor="#0f0f19"
      mutedColor="rgba(15,15,25,0.55)"
    >
      <HalftoneCmyk />
    </LabScene>
  );
}
