import PhoneFrame from "./PhoneFrame";

const SLOTS = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

/**
 * Pilier « Aller plus loin » : maquette d'application de réservation — écran
 * conçu avec les tokens du site, animation CSS légère (créneau qui se
 * confirme, jauge du soir qui se remplit). Pas de vidéo, pas de JS.
 */
export default function VisualLoin() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] py-6 md:py-2">
      <div className="mx-auto w-[58%] md:[transform:perspective(1400px)_rotateY(-8deg)_rotateX(2deg)]">
        <PhoneFrame>
          <div className="flex h-full flex-col px-4 pb-4 pt-12 text-left">
            <p className="text-[11px] uppercase tracking-widest text-text-tertiary">Ce soir</p>
            <p className="font-display text-xl font-bold tracking-[-0.02em] text-text-primary">Réserver une table</p>

            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {SLOTS.map((s, i) => (
                <span
                  key={s}
                  className={`app-slot rounded-lg border px-1 py-1.5 text-center text-[11px] font-medium ${
                    i === 3
                      ? "app-slot-live border-accent bg-accent text-white"
                      : i === 1 || i === 4
                        ? "border-white/5 bg-white/5 text-text-tertiary line-through"
                        : "border-border bg-bg-card text-text-primary"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-border bg-bg-card p-3">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span>Remplissage du soir</span>
                <span className="app-counter font-semibold text-text-primary">78 %</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="app-bar block h-full w-[78%] rounded-full bg-accent" />
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              {[
                ["Sanchez ×4", "20:00", "confirmé"],
                ["Martin ×2", "20:30", "en attente"],
              ].map(([n, h, st]) => (
                <div key={n} className="flex items-center justify-between rounded-lg border border-border bg-bg-card px-2.5 py-2 text-[11px]">
                  <span className="text-text-primary">{n}</span>
                  <span className="text-text-tertiary">{h}</span>
                  <span className={st === "confirmé" ? "text-accent" : "text-text-tertiary"}>{st}</span>
                </div>
              ))}
            </div>

            <span className="mt-auto rounded-full bg-accent py-2.5 text-center text-xs font-semibold text-white">
              Confirmer 20:00 · 4 pers.
            </span>
          </div>
        </PhoneFrame>
      </div>
      {/* Badges autour */}
      <span className="pill-float absolute -left-2 top-12 rounded-full border border-white/12 bg-bg-card/90 px-3 py-1.5 text-xs font-medium text-text-primary shadow-lg backdrop-blur-md md:-left-8" style={{ animationDelay: "0.3s" }}>
        0 commission
      </span>
      <span className="pill-float absolute -right-2 bottom-20 rounded-full border border-white/12 bg-bg-card/90 px-3 py-1.5 text-xs font-medium text-text-primary shadow-lg backdrop-blur-md md:-right-8" style={{ animationDelay: "1.1s" }}>
        Vos données, chez vous
      </span>
    </div>
  );
}
