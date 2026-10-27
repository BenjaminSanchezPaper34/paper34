// LABO — propre à la branche `labo` : ne JAMAIS reprendre dans main.
// Bande violette « LABO » fixe, visible sur toutes les pages, pour reconnaître
// le site d'essai d'un coup d'œil (modèle Labo de Benjamin, ~/.claude/modele-labo.md).
export default function LaboBadge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] overflow-hidden"
      style={{ width: 120, height: 120 }}
    >
      <div
        className="absolute text-center text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg"
        style={{
          width: 170,
          left: -45,
          top: 26,
          transform: "rotate(-45deg)",
          background: "#7c3aed", // violet Labo (signal, hors charte paper34 volontairement)
          padding: "6px 0",
        }}
      >
        Labo
      </div>
    </div>
  );
}
