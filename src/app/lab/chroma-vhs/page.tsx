import LabScene from "@/components/lab/LabScene";
import ChromaVhs from "@/components/lab/ChromaVhs";

export default function ChromaVhsPage() {
  return (
    <LabScene
      badge="VHS · vidéaste"
      tagline="Bougez la souris vite"
      titlePre="L'image, "
      highlight="dérèglée"
      titlePost="."
      subline="Aberration chromatique RGB, scanlines CRT, distorsion lentille au curseur, tracking VHS — l'esthétique défaut de captation comme signature."
      background="#000"
      textColor="#fff"
      mutedColor="rgba(255,255,255,0.55)"
    >
      <ChromaVhs />
    </LabScene>
  );
}
