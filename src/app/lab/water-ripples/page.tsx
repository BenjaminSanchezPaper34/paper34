import LabScene from "@/components/lab/LabScene";
import WaterSurface from "@/components/lab/WaterSurface";

export default function WaterRipplesPage() {
  return (
    <LabScene
      badge="Surface aquatique · jet ski / nautique"
      tagline="Bougez la souris · cliquez pour un splash"
      titlePre="L'eau, "
      highlight="vivante"
      titlePost="."
      subline="Surface animée + caustiques + ondulations radiales au curseur. Pensé pour une page d'accueil location de jet ski ou activités nautiques."
      background="#02060f"
      textColor="#fff"
      mutedColor="rgba(255,255,255,0.65)"
    >
      <WaterSurface />
    </LabScene>
  );
}
