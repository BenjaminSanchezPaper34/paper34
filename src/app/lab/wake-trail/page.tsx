import LabScene from "@/components/lab/LabScene";
import WakeTrail from "@/components/lab/WakeTrail";

export default function WakeTrailPage() {
  return (
    <LabScene
      badge="Wake trail · curseur"
      tagline="Bougez la souris"
      titlePre="Le "
      highlight="sillage"
      titlePost="."
      subline="Sillage à largeur variable construit en Catmull-Rom + polygone, finition aquarelle via blur CSS. Idéal jet ski, sports nautiques, surf, voile."
      background="#02060f"
      textColor="#fff"
      mutedColor="rgba(255,255,255,0.55)"
    >
      {/* Décor : dégradé bleu profond avec un soupçon de bleu turquoise en bas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #0a3a5a 0%, #051a30 45%, #02060f 100%)",
        }}
      />
      <WakeTrail
        options={{
          maxWidth: 36,
          lifetime: 1.8,
          bodyColor: "rgba(180, 230, 255, 0.85)",
          foamColor: "rgba(255, 255, 255, 0.95)",
          foamWidth: 2.5,
        }}
      />
    </LabScene>
  );
}
