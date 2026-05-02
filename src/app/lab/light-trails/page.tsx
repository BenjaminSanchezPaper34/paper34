import LabScene from "@/components/lab/LabScene";
import LightTrails from "@/components/lab/LightTrails";

export default function LightTrailsPage() {
  return (
    <LabScene
      badge="Light painting · photographe"
      tagline="Bougez la souris"
      titlePre="Capter la "
      highlight="lumière"
      titlePost=", pas l'instant."
      subline="Pose longue véritable : la traînée persiste plusieurs secondes et libère des bokehs qui flottent."
      background="#050408"
      textColor="#fff"
      mutedColor="rgba(255,255,255,0.55)"
    >
      <LightTrails />
    </LabScene>
  );
}
