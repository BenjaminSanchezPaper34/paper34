import { getProfileUrl, type ManagedAccount } from "@/lib/instagram-accounts";

type Props = {
  account: ManagedAccount;
  /** Léger tilt 3D pour les hero showcases. Désactivé par défaut. */
  tilt?: "left" | "right" | "none";
};

const DEFAULT_GRADIENT: [string, string] = ["#0071e3", "#1d4ed8"];

/**
 * Mockup iPhone qui affiche soit un screenshot manuel (si fourni dans les données),
 * soit un fallback visuel élégant simulant un profil Instagram :
 * header avec avatar gradient + nom + handle + 3 stats, puis grille 3×3 de tuiles colorées.
 *
 * Pour avoir le vrai feed du compte, déposer une image dans public/images/social/{handle}.jpg
 * et renseigner le champ screenshot sur l'objet ManagedAccount.
 */
export default function PhoneMockup({ account, tilt = "none" }: Props) {
  const profileUrl = getProfileUrl(account.handle);
  const [c1, c2] = account.gradient ?? DEFAULT_GRADIENT;

  // Avatar : initiales du nom (1 ou 2 lettres max)
  const initials = account.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  // 9 tuiles avec variations d'opacité du gradient pour simuler un feed
  const tiles = Array.from({ length: 9 }).map((_, i) => {
    const opacities = [0.95, 0.55, 0.85, 0.4, 0.75, 0.6, 0.9, 0.5, 0.7];
    const angles = [135, 45, 90, 200, 60, 130, 180, 110, 50];
    return { opacity: opacities[i], angle: angles[i] };
  });

  const tiltClass =
    tilt === "left"
      ? "md:[transform:perspective(1200px)_rotateY(8deg)_rotateX(2deg)]"
      : tilt === "right"
      ? "md:[transform:perspective(1200px)_rotateY(-8deg)_rotateX(2deg)]"
      : "";

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Voir le compte Instagram de ${account.name}`}
    >
      {/* Cadre iPhone */}
      <div
        className={`relative mx-auto w-[240px] md:w-[280px] aspect-[9/19] rounded-[2.5rem] bg-[#0a0a0a] p-2.5 shadow-2xl shadow-black/50 transition-all duration-500 group-hover:shadow-accent-glow ${tiltClass}`}
      >
        {/* Bordure brillante */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />

        {/* Encoche dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

        {/* Écran */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white">
          {account.screenshot ? (
            <img
              src={account.screenshot}
              alt={`Compte Instagram de ${account.name}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            // Fallback visuel : profil Instagram simulé
            <div className="absolute inset-0 flex flex-col bg-white text-black">
              {/* Status bar */}
              <div className="h-7 flex-shrink-0" />

              {/* Header profil */}
              <div className="flex items-center gap-3 px-4 pt-2 pb-3">
                {/* Avatar gradient avec initiales */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  }}
                >
                  {initials}
                </div>
                {/* Nom + bouton suivre simulé */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold truncate">
                    {account.handle}
                  </p>
                  <div className="mt-1 inline-block bg-[#0095f6] text-white text-[9px] font-semibold px-3 py-0.5 rounded">
                    Suivre
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-around px-3 pb-3 text-center">
                {[
                  { v: "—", l: "publi." },
                  { v: "—", l: "abonnés" },
                  { v: "—", l: "suivis" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-xs font-bold">{s.v}</p>
                    <p className="text-[9px] text-gray-500">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="px-4 pb-3">
                <p className="text-[10px] font-semibold">{account.name}</p>
                <p className="text-[9px] text-gray-600 mt-0.5 leading-tight">
                  {account.category}
                </p>
              </div>

              {/* Onglets */}
              <div className="flex border-t border-gray-200">
                <div className="flex-1 py-2 flex justify-center border-t-2 border-black -mt-px">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="flex-1 py-2 flex justify-center opacity-30">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="flex-1 py-2 flex justify-center opacity-30">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
              </div>

              {/* Grille 3×3 du feed (tuiles colorées en attendant les vraies images) */}
              <div className="flex-1 grid grid-cols-3 gap-px bg-gray-100">
                {tiles.map((t, i) => (
                  <div
                    key={i}
                    className="aspect-square"
                    style={{
                      background: `linear-gradient(${t.angle}deg, ${c1}, ${c2})`,
                      opacity: t.opacity,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-5 text-center">
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
          {account.category}
        </p>
        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
          {account.name}
        </h3>
        <p className="text-sm text-text-tertiary mt-1">@{account.handle}</p>
      </div>
    </a>
  );
}
